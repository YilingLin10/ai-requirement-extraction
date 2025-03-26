const mockResponseString = JSON.stringify([
    {
      id: 1,
      category: "Authentication & Authorization",
      category_description: "Login, registration, role-based access, session management",
      original_text: "User authentication with roles (Admin, Manager, Employee)"
    },
    {
      id: 2,
      category: "Data Storage & Management",
      category_description: "CRUD operations, relational data, file storage",
      original_text: "Customer data storage & management"
    },
    {
      id: 3,
      category: "Reporting & Analytics",
      category_description: "Dashboards, performance metrics, data visualization",
      original_text: "Sales performance reports & analytics"
    },
    {
      id: 4,
      category: "API / Integration",
      category_description: "RESTful APIs, third-party integrations (e.g., Stripe, Gmail)",
      original_text: "Email service integration (Gmail, Outlook)"
    },
    {
      id: 5,
      category: "API / Integration",
      category_description: "RESTful APIs, third-party integrations (e.g., Stripe, Gmail)",
      original_text: "API access for third-party integrations"
    }
], null, 2);
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function textGeneration(prompt: string): Promise<string> {
    await wait(1200);
    return mockResponseString;
}
    