from locust import HttpUser, task, between

class ApiUser(HttpUser):
    wait_time = between(1, 3)

    @task
    def get_profile(self):
        self.client.get("/get-profile")

    @task
    def get_blogs(self):
        self.client.get("/get-blogs")

    @task
    def get_education(self):
        self.client.get("/get-education")

    @task
    def get_experience(self):
        self.client.get("/get-experience")

    @task
    def get_projects(self):
        self.client.get("/get-projects")

    @task
    def get_skills(self):
        self.client.get("/get-skills")

    @task
    def get_leetcode_state(self):
        self.client.get("/get-leetcode-state")

    @task
    def get_leetcode_problems(self):
        self.client.get("/get-leetcode-problems")

    @task
    def get_leetcode_heatmap(self):
        self.client.get("/get-leetcode-heatmap")

    @task
    def get_gfg_stats(self):
        self.client.get("/get-gfg-stats")

    @task
    def get_gfg_problems(self):
        self.client.get("/get-gfg-problems")

    @task
    def get_blog_detail(self):
        self.client.get("/get-blog-detail/68bf7d7d012c05c12fdc8623")

