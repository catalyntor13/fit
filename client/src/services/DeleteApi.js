export async function deleteUser(userId) {
  try {
    const response = await fetch("http://localhost:3000/api/delete-user", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Failed to delete user");
    }

    console.log(data.message); // Successfully deleted
  } catch (error) {
    console.error("Error:", error.message);
  }
}
