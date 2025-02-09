import { Btn } from "../../components/button"
import { Input } from "../../components/InputField"


const HomeScreen = () => {
  return (
    <main className="font-grotesk text-4xl text-success">
      <Btn>Click</Btn>
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