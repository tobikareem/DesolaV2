import { FaCheck } from "react-icons/fa"
import { Text } from "../../components/ui/TextComp"
import { useNavigate } from "react-router"
import { Btn } from "../../components/ui/Button"

const PasswordSetSuccess =()=> {
  const navigate = useNavigate()

  return(
        <div className="font-work flex h-screen lg:flex-row flex-col w-full">
          <div className="w-full p-6 h-auto flex-grow flex justify-center items-center md:p-10">
            <div className="w-full max-w-md md:p-10">
              <div className="flex justify-center mb-4">
                <div className="bg-secondary-500 p-3 rounded">
                  <FaCheck className="text-white w-15 h-6" />
                </div>
              </div>
              <Text
                as="h1"
                size="4xl"
                weight="medium"
                className=" mb-2 text-center font-grotesk"
              >
                All Done!
              </Text>
              <Text as="p" size="base" className="font-work text-neutral-500 text-center mb-14">
                Your password has been reset. Proceed to Login.
              </Text>
              
              <Btn onClick={() => navigate('/signin')}
                className="bg-gradient-to-b from-orange-400 to-orange-600 text-white px-6 py-2 rounded-md text-sm w-full">
                Login
              </Btn>
            </div>
          </div>
        </div>
  )
}

export default PasswordSetSuccess