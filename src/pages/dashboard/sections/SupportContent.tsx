import React from "react";
import { Input } from "../../../components/InputField";
import { TextArea } from "../../../components/TextAreaField";
import { Btn } from "../../../components/Button";
import { Text } from "../../../components/TextComp";


export const SupportContent: React.FC = () => {
  return(
    <div className="flex-1 overflow-y-auto">
          <Text
            as="h1"
            size="2xl"
            weight="bold"
            className="font-grotesk text-primary-500 mb-5"
          >
            Support
          </Text>
          <div className="mt-7 w-full">
            <Text
              as="h5"
              size="sm"
              weight="bold"
              className="font-grotesk  mb-1"
            >
              Lets chat, reach out to us
            </Text>
            <Text as="p" size="xs" weight="light" className="font-grotesk">
              Have a question or feed back we are here to help. Send us a
              message, and we’ll response in 24 hours
            </Text>
            <form className="mt-6 flex flex-col flex-grow w-full h-full gap-4">
              <div className="w-full">
                <Input
                  label="First Name"
                  type="text"
                  placeholder="First Name"
                  className="bg-[#F3F3F3] w-full h-8 round-md placeholder:text-[#B7B7B7] placeholder:"
                />
              </div>
              <div className="w-full">
                <Input
                  label="Last Name"
                  type="text"
                  placeholder="Last Name"
                  className="bg-[#F3F3F3] h-8 round-md placeholder:text-[#B7B7B7] placeholder:"
                />
              </div>

              <Input
                label="Email Address"
                type="email"
                placeholder="email"
                className="bg-[#F3F3F3] w-full h-8 rounded-md placeholder:text-[#B7B7B7] placeholder:"
              />
              <div className="flex flex-col flex-grow h-full">
                <TextArea
                  label="Message"
                  placeholder="Leave us a message..."
                  className=" bg-[#F3F3F3]  flex h-[145px]  rounded-md placeholder:text-[#B7B7B7] placeholder:"
                />
              </div>

              <Btn
                type="submit"
                className=" text-nowrap rounded-xl py-3 bg-primary-700 w-full text-base text-white"
              >
                Send Message
              </Btn>
            </form>
          </div>
        </div>
  )
}