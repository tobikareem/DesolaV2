import { Text } from "../TextComp"


export const List =()=>{
  

  const Data =['','',]

  return(
    <>
    
      <div className='bg-white flex flex-col max-w-xs border border-neutral-300 rounded-lg overflow-hidden '>
        {
          Data.map((item)=>(
            <div key={item}
              className='flex items-center p-2.5 border-b border-neutral-300'>
              <Text size="xs" color="text-neutral-500"
                className="font-work"
              >
                {item}
              </Text>
            </div>
          ))
        }
      </div>
    
    </>
  )
}



