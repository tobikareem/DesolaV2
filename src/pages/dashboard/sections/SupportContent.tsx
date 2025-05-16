import React, { useState } from 'react';
import { Input } from '../../../components/ui/InputField';
import { TextArea } from '../../../components/ui/TextAreaField';
import { Btn } from '../../../components/ui/Button';
import { Text } from '../../../components/ui/TextComp';
import { toast } from 'react-toastify';
import { useValidate} from '../../../hooks/useValidate';

export const SupportContent: React.FC = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    message: '',
  });

  const {errors, isValid} = useValidate({
    firstname: formData.firstname,
    lastname: formData.lastname,
    email: formData.email,
    phone: formData.phone,
    message: formData.message,
  });
  

 const handleSubmit = (e: React.FormEvent) => {
   e.preventDefault();

   if (!isValid) return;

   toast.success('Message submitted successfully!');
 };

  return (
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
        <Text as="h5" size="sm" weight="bold" className="font-grotesk  mb-1">
          Lets chat, reach out to us
        </Text>
        <Text as="p" size="xs" weight="light" className="font-grotesk">
          Have a question or feed back we are here to help. Send us a message,
          and we’ll respond in 24 hours
        </Text>
        <form
          className="mt-6 flex flex-col flex-grow w-full h-full gap-4"
          onSubmit={handleSubmit}
        >
          <div className="w-full">
            <Input
              label="First Name"
              type="text"
              error={errors.firstname}
              value={formData.firstname}
              onChange={(e) =>
                setFormData({ ...formData, firstname: e.target.value })
              }
              placeholder="First Name"
              className="bg-[#F3F3F3] w-full h-8 !round-md placeholder:text-[#B7B7B7] placeholder:"
            />
          </div>
          <div className="w-full">
            <Input
              label="Last Name"
              value={formData.lastname}
              error={errors.lastname}
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
              type="text"
              placeholder="Last Name"
              className="bg-[#F3F3F3] h-8 !round-md placeholder:text-[#B7B7B7] placeholder:"
            />
          </div>
          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            error={errors.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="email"
            className="bg-[#F3F3F3] w-full h-8 rounded-md placeholder:text-[#B7B7B7] placeholder:"
          />
          <Input
            label="Phone Number"
            type="text"
            value={formData.phone}
            error={errors.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="Phone number"
            className="bg-[#F3F3F3] w-full h-8 rounded-md placeholder:text-[#B7B7B7] placeholder:"
          />
          <div className="flex flex-col flex-grow h-full">
            <TextArea
              label="Message"
              value={formData.message}
              error={errors.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
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
  );
};
