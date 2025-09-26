#!/usr/bin/env python3
"""
Backend API Testing Suite for Yorramn Portfolio
Tests all backend endpoints with comprehensive validation
"""

import requests
import json
import sys
import os
from datetime import datetime
from typing import Dict, Any

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except FileNotFoundError:
        pass
    return "http://localhost:8001"

BASE_URL = get_backend_url()
API_BASE = f"{BASE_URL}/api"

class PortfolioAPITester:
    def __init__(self):
        self.results = {
            "total_tests": 0,
            "passed": 0,
            "failed": 0,
            "errors": [],
            "test_details": []
        }
        
    def log_test(self, test_name: str, passed: bool, details: str = "", response_data: Any = None):
        """Log test result"""
        self.results["total_tests"] += 1
        if passed:
            self.results["passed"] += 1
            status = "✅ PASS"
        else:
            self.results["failed"] += 1
            status = "❌ FAIL"
            self.results["errors"].append(f"{test_name}: {details}")
        
        test_info = {
            "test": test_name,
            "status": status,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        
        if response_data:
            test_info["response_data"] = response_data
            
        self.results["test_details"].append(test_info)
        print(f"{status} - {test_name}")
        if details:
            print(f"    Details: {details}")
        if not passed and response_data:
            print(f"    Response: {response_data}")
        print()

    def test_health_endpoint(self):
        """Test GET /api/health endpoint"""
        print("🔍 Testing Health Check Endpoint...")
        
        try:
            response = requests.get(f"{API_BASE}/health", timeout=10)
            
            # Test status code
            if response.status_code == 200:
                self.log_test("Health Check - Status Code", True, "Returns 200 OK")
            else:
                self.log_test("Health Check - Status Code", False, 
                            f"Expected 200, got {response.status_code}", response.text)
                return
            
            # Test response structure
            try:
                data = response.json()
                
                # Check required fields
                required_fields = ["status", "timestamp", "services"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if not missing_fields:
                    self.log_test("Health Check - Response Structure", True, 
                                "All required fields present")
                else:
                    self.log_test("Health Check - Response Structure", False, 
                                f"Missing fields: {missing_fields}", data)
                    return
                
                # Check status value
                if data.get("status") == "healthy":
                    self.log_test("Health Check - Status Value", True, "Status is 'healthy'")
                else:
                    self.log_test("Health Check - Status Value", False, 
                                f"Expected 'healthy', got '{data.get('status')}'", data)
                
                # Check services
                services = data.get("services", {})
                expected_services = ["database", "github_api", "email_service"]
                
                for service in expected_services:
                    if service in services:
                        service_status = services[service]
                        self.log_test(f"Health Check - {service.title()} Service", True, 
                                    f"Service status: {service_status}")
                    else:
                        self.log_test(f"Health Check - {service.title()} Service", False, 
                                    f"Service '{service}' not found in response", data)
                
            except json.JSONDecodeError:
                self.log_test("Health Check - JSON Response", False, 
                            "Response is not valid JSON", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("Health Check - Connection", False, f"Request failed: {str(e)}")

    def test_github_repos_endpoint(self):
        """Test GET /api/github/repos endpoint"""
        print("🔍 Testing GitHub Repositories Endpoint...")
        
        try:
            response = requests.get(f"{API_BASE}/github/repos", timeout=15)
            
            # Test status code
            if response.status_code == 200:
                self.log_test("GitHub Repos - Status Code", True, "Returns 200 OK")
            else:
                self.log_test("GitHub Repos - Status Code", False, 
                            f"Expected 200, got {response.status_code}", response.text)
                return
            
            # Test response structure
            try:
                data = response.json()
                
                # Check required fields
                if "repos" in data and "total" in data:
                    self.log_test("GitHub Repos - Response Structure", True, 
                                "Contains 'repos' and 'total' fields")
                else:
                    self.log_test("GitHub Repos - Response Structure", False, 
                                "Missing 'repos' or 'total' fields", data)
                    return
                
                repos = data.get("repos", [])
                total = data.get("total", 0)
                
                # Check total count matches repos length
                if len(repos) == total:
                    self.log_test("GitHub Repos - Count Consistency", True, 
                                f"Total ({total}) matches repos count ({len(repos)})")
                else:
                    self.log_test("GitHub Repos - Count Consistency", False, 
                                f"Total ({total}) doesn't match repos count ({len(repos)})", data)
                
                # Test individual repo structure if repos exist
                if repos:
                    first_repo = repos[0]
                    required_repo_fields = [
                        "name", "description", "githubUrl", "stars", "forks", 
                        "language", "updated_at", "technologies", "featured"
                    ]
                    
                    missing_repo_fields = [field for field in required_repo_fields 
                                         if field not in first_repo]
                    
                    if not missing_repo_fields:
                        self.log_test("GitHub Repos - Repo Structure", True, 
                                    "All required repo fields present")
                    else:
                        self.log_test("GitHub Repos - Repo Structure", False, 
                                    f"Missing repo fields: {missing_repo_fields}", first_repo)
                    
                    # Test GitHub URL format
                    github_url = first_repo.get("githubUrl", "")
                    if github_url.startswith("https://github.com/yorramn/"):
                        self.log_test("GitHub Repos - URL Format", True, 
                                    "GitHub URL has correct format")
                    else:
                        self.log_test("GitHub Repos - URL Format", False, 
                                    f"Invalid GitHub URL format: {github_url}")
                    
                    # Test technologies array
                    technologies = first_repo.get("technologies", [])
                    if isinstance(technologies, list):
                        self.log_test("GitHub Repos - Technologies Format", True, 
                                    f"Technologies is array with {len(technologies)} items")
                    else:
                        self.log_test("GitHub Repos - Technologies Format", False, 
                                    "Technologies should be an array", first_repo)
                    
                    # Test data types
                    if isinstance(first_repo.get("stars"), int) and isinstance(first_repo.get("forks"), int):
                        self.log_test("GitHub Repos - Data Types", True, 
                                    "Stars and forks are integers")
                    else:
                        self.log_test("GitHub Repos - Data Types", False, 
                                    "Stars and forks should be integers", first_repo)
                    
                    self.log_test("GitHub Repos - Data Retrieval", True, 
                                f"Successfully retrieved {len(repos)} repositories for user 'yorramn'")
                else:
                    self.log_test("GitHub Repos - Data Retrieval", False, 
                                "No repositories returned", data)
                
            except json.JSONDecodeError:
                self.log_test("GitHub Repos - JSON Response", False, 
                            "Response is not valid JSON", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("GitHub Repos - Connection", False, f"Request failed: {str(e)}")

    def test_contact_form_valid_data(self):
        """Test POST /api/contact with valid data"""
        print("🔍 Testing Contact Form with Valid Data...")
        
        test_data = {
            "name": "Teste Usuario",
            "email": "teste@example.com",
            "phone": "(11) 98941-6584",
            "message": "Esta é uma mensagem de teste para verificar o funcionamento do formulário de contato do portfolio."
        }
        
        try:
            response = requests.post(
                f"{API_BASE}/contact", 
                json=test_data,
                headers={"Content-Type": "application/json"},
                timeout=15
            )
            
            # Test status code
            if response.status_code == 200:
                self.log_test("Contact Form Valid - Status Code", True, "Returns 200 OK")
            else:
                self.log_test("Contact Form Valid - Status Code", False, 
                            f"Expected 200, got {response.status_code}", response.text)
                return
            
            # Test response structure
            try:
                data = response.json()
                
                # Check required fields
                if "success" in data and "message" in data:
                    self.log_test("Contact Form Valid - Response Structure", True, 
                                "Contains 'success' and 'message' fields")
                else:
                    self.log_test("Contact Form Valid - Response Structure", False, 
                                "Missing 'success' or 'message' fields", data)
                    return
                
                # Check success value
                if data.get("success") is True:
                    self.log_test("Contact Form Valid - Success Value", True, 
                                "Success field is True")
                else:
                    self.log_test("Contact Form Valid - Success Value", False, 
                                f"Expected True, got {data.get('success')}", data)
                
                # Check message content
                message = data.get("message", "")
                if message and len(message) > 0:
                    self.log_test("Contact Form Valid - Response Message", True, 
                                f"Response message: {message}")
                else:
                    self.log_test("Contact Form Valid - Response Message", False, 
                                "Empty or missing response message", data)
                
            except json.JSONDecodeError:
                self.log_test("Contact Form Valid - JSON Response", False, 
                            "Response is not valid JSON", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("Contact Form Valid - Connection", False, f"Request failed: {str(e)}")

    def test_contact_form_invalid_data(self):
        """Test POST /api/contact with invalid data"""
        print("🔍 Testing Contact Form with Invalid Data...")
        
        # Test cases for invalid data
        invalid_test_cases = [
            {
                "name": "Missing Email",
                "data": {
                    "name": "Test User",
                    "phone": "(11) 98941-6584",
                    "message": "Test message without email"
                },
                "expected_status": 422
            },
            {
                "name": "Invalid Email",
                "data": {
                    "name": "Test User",
                    "email": "invalid-email",
                    "phone": "(11) 98941-6584",
                    "message": "Test message with invalid email"
                },
                "expected_status": 422
            },
            {
                "name": "Short Message",
                "data": {
                    "name": "Test User",
                    "email": "test@example.com",
                    "phone": "(11) 98941-6584",
                    "message": "Short"
                },
                "expected_status": 400
            },
            {
                "name": "Missing Name",
                "data": {
                    "email": "test@example.com",
                    "phone": "(11) 98941-6584",
                    "message": "Test message without name"
                },
                "expected_status": 422
            }
        ]
        
        for test_case in invalid_test_cases:
            try:
                response = requests.post(
                    f"{API_BASE}/contact", 
                    json=test_case["data"],
                    headers={"Content-Type": "application/json"},
                    timeout=10
                )
                
                # Test status code
                expected_status = test_case["expected_status"]
                if response.status_code in [400, 422]:
                    self.log_test(f"Contact Form Invalid - {test_case['name']} Status", True, 
                                f"Returns error status {response.status_code}")
                else:
                    self.log_test(f"Contact Form Invalid - {test_case['name']} Status", False, 
                                f"Expected 400/422, got {response.status_code}", response.text)
                
                # Test that it returns error response
                try:
                    data = response.json()
                    if "detail" in data or "message" in data:
                        self.log_test(f"Contact Form Invalid - {test_case['name']} Error Response", True, 
                                    "Returns proper error response")
                    else:
                        self.log_test(f"Contact Form Invalid - {test_case['name']} Error Response", False, 
                                    "Missing error details in response", data)
                except json.JSONDecodeError:
                    self.log_test(f"Contact Form Invalid - {test_case['name']} JSON", False, 
                                "Response is not valid JSON", response.text)
                    
            except requests.exceptions.RequestException as e:
                self.log_test(f"Contact Form Invalid - {test_case['name']} Connection", False, 
                            f"Request failed: {str(e)}")

    def test_api_root_endpoint(self):
        """Test GET /api/ root endpoint"""
        print("🔍 Testing API Root Endpoint...")
        
        try:
            response = requests.get(f"{API_BASE}/", timeout=10)
            
            if response.status_code == 200:
                self.log_test("API Root - Status Code", True, "Returns 200 OK")
                
                try:
                    data = response.json()
                    if "message" in data and "version" in data:
                        self.log_test("API Root - Response Structure", True, 
                                    f"Message: {data.get('message')}, Version: {data.get('version')}")
                    else:
                        self.log_test("API Root - Response Structure", False, 
                                    "Missing message or version fields", data)
                except json.JSONDecodeError:
                    self.log_test("API Root - JSON Response", False, 
                                "Response is not valid JSON", response.text)
            else:
                self.log_test("API Root - Status Code", False, 
                            f"Expected 200, got {response.status_code}", response.text)
                
        except requests.exceptions.RequestException as e:
            self.log_test("API Root - Connection", False, f"Request failed: {str(e)}")

    def run_all_tests(self):
        """Run all API tests"""
        print("=" * 60)
        print("🚀 STARTING YORRAMN PORTFOLIO BACKEND API TESTS")
        print(f"📍 Testing against: {API_BASE}")
        print("=" * 60)
        print()
        
        # Run all tests
        self.test_api_root_endpoint()
        self.test_health_endpoint()
        self.test_github_repos_endpoint()
        self.test_contact_form_valid_data()
        self.test_contact_form_invalid_data()
        
        # Print summary
        print("=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {self.results['total_tests']}")
        print(f"✅ Passed: {self.results['passed']}")
        print(f"❌ Failed: {self.results['failed']}")
        print(f"Success Rate: {(self.results['passed']/self.results['total_tests']*100):.1f}%")
        print()
        
        if self.results['errors']:
            print("🚨 FAILED TESTS:")
            for error in self.results['errors']:
                print(f"  • {error}")
            print()
        
        # Return success status
        return self.results['failed'] == 0

def main():
    """Main test execution"""
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    
    # Save detailed results to file
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump(tester.results, f, indent=2, ensure_ascii=False)
    
    print(f"📄 Detailed results saved to: /app/backend_test_results.json")
    
    if success:
        print("🎉 ALL TESTS PASSED!")
        sys.exit(0)
    else:
        print("💥 SOME TESTS FAILED!")
        sys.exit(1)

if __name__ == "__main__":
    main()