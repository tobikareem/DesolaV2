import { Img as ReactImage } from 'react-image';
import { Text } from '../../components/TextComp';
import { Link } from 'react-router-dom';
import { AiOutlineRollback } from 'react-icons/ai';

const Error404Page =()=> {
  return(
    <div className="w-screen h-screen bg-secondary-100 p-6">
      <div className="w-full h-full flex flex-col gap-[60px] items-center justify-center">
        <Text
          as="h1"
          color="!text-black"
          className="font-poppins !text-[64px] font-black"
        >
          404
        </Text>
        <ReactImage
          src="/404.svg"
          alt="404 Error"
        />
        <Link to='/' className="font-poppins flex items-center gap-2 hover:font-semibold text-2xl text-black border-b-[2px] border-black">
          <AiOutlineRollback /> Go Home
          
        </Link>
      </div>
    </div>
  )
}

export default Error404Page;