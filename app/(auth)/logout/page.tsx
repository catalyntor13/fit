import Logout from "./logout-component";

export default function LogoutPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Logout</h1>
        <p className="text-muted-foreground">Click the button below to logout</p>
        <Logout />
      </div>
    </div>
  );
}