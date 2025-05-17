import React, { useState } from 'react';
import { Input } from '../../../components/ui/InputField';
import { TextArea } from '../../../components/ui/TextAreaField';
import { Btn } from '../../../components/ui/Button';
import { Text } from '../../../components/ui/TextComp';
import { toast } from 'react-toastify';
import { UseValidate } from '../../../hooks/useValidation';

export const SupportContent: React.FC = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  
  
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     const validationErrors = UseValidate(formData);
  
     if (Object.keys(validationErrors).length > 0) {
       setErrors(validationErrors);
       toast.error('Please, fill the forms appropriately');
     } else {
       setErrors({});
       toast.success('Message sent successfully!');
       setFormData({ firstname: "", lastname: "", email: "", phone: "", message: "" });
     }
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
              onChange={handleChange}
              value={formData.firstname}
              name="firstname"
              placeholder="First Name"
              className="bg-[#F3F3F3] w-full h-8 !round-md placeholder:text-[#B7B7B7] placeholder:"
            />
          </div>
          <div className="w-full">
            <Input
              label="Last Name"
              value={formData.lastname}
              error={errors.lastname}
              onChange={handleChange}
              name="lastname"
              type="text"
              placeholder="Last Name"
              className="bg-[#F3F3F3] h-8 !round-md placeholder:text-[#B7B7B7] placeholder:"
            />
          </div>
          <Input
            label="Email Address"
            type="email"
            onChange={handleChange}
            name="email"
            value={formData.email}
            error={errors.email}
            placeholder="email"
            className="bg-[#F3F3F3] w-full h-8 rounded-md placeholder:text-[#B7B7B7] placeholder:"
          />
          <Input
            label="Phone Number"
            type="text"
            value={formData.phone}
            error={errors.phone}
            onChange={handleChange}
            name="phone"
            placeholder="Phone number"
            className="bg-[#F3F3F3] w-full h-8 rounded-md placeholder:text-[#B7B7B7] placeholder:"
          />
          <div className="flex flex-col flex-grow h-full">
            <TextArea
              label="Message"
              value={formData.message}
              error={errors.message}
              onChange={handleChange}
              name="message"
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
