import requests
import logging
from typing import List, Dict, Optional

logger = logging.getLogger(__name__)

class GitHubService:
    def __init__(self):
        self.base_url = "https://api.github.com"
        self.username = "yorramn"
    
    async def get_user_repos(self) -> List[Dict]:
        """
        Fetch user repositories from GitHub API
        """
        try:
            url = f"{self.base_url}/users/{self.username}/repos"
            params = {
                'sort': 'updated',
                'per_page': 100,
                'type': 'all'
            }
            
            response = requests.get(url, params=params, timeout=10)
            
            if response.status_code != 200:
                logger.error(f"GitHub API error: {response.status_code}")
                return []
            
            repos_data = response.json()
            processed_repos = []
            
            for repo in repos_data:
                # Skip forked repos unless they have significant changes
                if repo.get('fork', False) and repo.get('stargazers_count', 0) == 0:
                    continue
                
                processed_repo = {
                    'name': repo.get('name', ''),
                    'description': repo.get('description', 'No description available'),
                    'githubUrl': repo.get('html_url', ''),
                    'liveUrl': self._extract_live_url(repo),
                    'stars': repo.get('stargazers_count', 0),
                    'forks': repo.get('forks_count', 0),
                    'language': repo.get('language', 'Unknown'),
                    'updated_at': repo.get('updated_at', ''),
                    'technologies': self._extract_technologies(repo),
                    'featured': self._is_featured_repo(repo)
                }
                
                processed_repos.append(processed_repo)
            
            # Sort by stars and recent activity
            processed_repos.sort(key=lambda x: (x['stars'], x['updated_at']), reverse=True)
            
            return processed_repos[:12]  # Limit to 12 most relevant repos
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Error fetching GitHub repos: {str(e)}")
            return []
        except Exception as e:
            logger.error(f"Unexpected error in GitHub service: {str(e)}")
            return []
    
    def _extract_live_url(self, repo: Dict) -> Optional[str]:
        """
        Extract live URL from repository data
        """
        homepage = repo.get('homepage')
        if homepage and homepage.startswith('http'):
            return homepage
        
        # Check if it's a GitHub Pages repo
        if repo.get('has_pages', False):
            return f"https://{self.username}.github.io/{repo.get('name', '')}"
        
        return None
    
    def _extract_technologies(self, repo: Dict) -> List[str]:
        """
        Extract technologies/languages from repository
        """
        technologies = []
        
        # Primary language
        if repo.get('language'):
            technologies.append(repo['language'])
        
        # Common web technologies based on repo name and description
        name = repo.get('name', '').lower()
        description = repo.get('description', '').lower()
        
        # Backend technologies
        if any(term in name or term in description for term in ['laravel', 'php']):
            if 'Laravel' not in technologies:
                technologies.append('Laravel')
            if 'PHP' not in technologies:
                technologies.append('PHP')
        
        if any(term in name or term in description for term in ['java', 'spring']):
            if 'Java' not in technologies:
                technologies.append('Java')
        
        if any(term in name or term in description for term in ['graphql', 'gql']):
            technologies.append('GraphQL')
        
        # Frontend technologies
        if any(term in name or term in description for term in ['vue', 'vuejs']):
            technologies.append('Vue.js')
        
        if any(term in name or term in description for term in ['react', 'reactjs']):
            technologies.append('React')
        
        if any(term in name or term in description for term in ['javascript', 'js']):
            technologies.append('JavaScript')
        
        # Database technologies
        if any(term in name or term in description for term in ['mysql', 'sql']):
            technologies.append('MySQL')
        
        if any(term in name or term in description for term in ['postgres', 'postgresql']):
            technologies.append('PostgreSQL')
        
        if any(term in name or term in description for term in ['mongo', 'mongodb']):
            technologies.append('MongoDB')
        
        # Infrastructure
        if any(term in name or term in description for term in ['docker', 'dockerfile']):
            technologies.append('Docker')
        
        # Remove duplicates and return max 6 technologies
        unique_technologies = list(dict.fromkeys(technologies))
        return unique_technologies[:6]
    
    def _is_featured_repo(self, repo: Dict) -> bool:
        """
        Determine if a repository should be featured
        """
        # Featured if has good activity or specific projects
        featured_names = ['cv-creator', 'galactus', 'portfolio', 'api', 'ecommerce']
        
        name = repo.get('name', '').lower()
        stars = repo.get('stargazers_count', 0)
        has_description = bool(repo.get('description'))
        
        # Feature if it's a known project or has good metrics
        if any(featured_name in name for featured_name in featured_names):
            return True
        
        if stars > 2 and has_description:
            return True
        
        return False