import React, { useState } from 'react';
import { Input } from '../../../components/ui/InputField';
import { TextArea } from '../../../components/ui/TextAreaField';
import { Btn } from '../../../components/ui/Button';
import { Text } from '../../../components/ui/TextComp';
import { toast } from 'react-toastify';
import { UseValidate } from '../../../hooks/useValidation';
import { Title } from '../../../components/layout/Title';

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
    <div className="flex-1 h-full">
      <Title>
        Support
      </Title>
      <div className="mt-7 w-full h-full overflow-y-auto">
        <Text as="h5" size="sm" weight="bold" className="font-grotesk mb-1">
          Lets chat, reach out to us
        </Text>
        <Text as="p" size="xs" weight="light" className="font-grotesk">
          Have a question or feed back we are here to help. Send us a message,
          and we’ll respond in 24 hours
        </Text>
        <form className="mt-6 mb-24 flex flex-col w-full gap-4" onSubmit={handleSubmit}>
          <Input
            label="First Name"
            type="text"
            error={errors.firstname}
            onChange={handleChange}
            value={formData.firstname}
            name="firstname"
            placeholder="First Name"
            className="bg-[#F3F3F3] w-full h-8 !rounded-md placeholder:text-[#B7B7B7]"
          />
          <Input
            label="Last Name"
            value={formData.lastname}
            error={errors.lastname}
            onChange={handleChange}
            name="lastname"
            type="text"
            placeholder="Last Name"
            className="bg-[#F3F3F3] w-full h-8 !rounded-md placeholder:text-[#B7B7B7]"
          />
          <Input
            label="Email Address"
            type="email"
            onChange={handleChange}
            name="email"
            value={formData.email}
            error={errors.email}
            placeholder="Email"
            className="bg-[#F3F3F3] w-full h-8 rounded-md placeholder:text-[#B7B7B7]"
          />
          <Input
            label="Phone Number"
            type="text"
            value={formData.phone}
            error={errors.phone}
            onChange={handleChange}
            name="phone"
            placeholder="Phone number"
            className="bg-[#F3F3F3] w-full h-8 rounded-md placeholder:text-[#B7B7B7]"
          />
          <TextArea
            label="Message"
            value={formData.message}
            error={errors.message}
            onChange={handleChange}
            name="message"
            placeholder="Leave us a message..."
            className=" bg-[#F3F3F3] flex min-h-[145px] rounded-md placeholder:text-[#B7B7B7]"
          />
          <Btn type="submit" radius='48px'
            className="text-nowrap py-3 bg-primary-700 w-full text-base text-white hover:!scale-95 "
          >
            Send Message
          </Btn>
        </form>
      </div>
    </div>
  );
};
