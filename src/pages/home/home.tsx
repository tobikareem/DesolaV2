import { Btn } from "../../components/button"
import { Input } from "../../components/InputField"
import { APP_NAME } from "../../utils/constants"


const HomeScreen = () => {
  return (
    <main className="font-grotesk text-4xl text-success flex flex-col items-center justify-center min-h-screen">
      <h2 className="mb-4">Welcome to {APP_NAME}</h2>
      <Btn onClick={() => alert("Button Clicked!")} key={"clickMe"}>Click Me</Btn>

      <div>
        <Input
          label="Username"
          placeholder="Enter your username"
          className="w-64 text-base"
        />

      </div>
    </main>
  );
}

export default HomeScreen