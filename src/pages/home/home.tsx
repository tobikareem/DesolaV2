import { Btn } from "../../components/Button"
import { Input } from "../../components/InputField"
import { APP_NAME } from "../../utils/constants"


const HomeScreen = () => {
  return (
    <main className="font-grotesk text-4xl text-success flex flex-col items-center justify-center min-h-screen">
      
      <h2 className="mb-4">Welcome to {APP_NAME}</h2>

      <form className="space-y-4 mb-3">
        <Input
          label="Username"
          placeholder="Enter your username"
          className="w-64 text-base"
          error="This field is required"
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          className="w-64 text-base"
        />
      </form>

      <Btn onClick={() => alert("Button Clicked!")} key={"clickMe"}>Click Me</Btn>

    </main>
  );
}

export default HomeScreen