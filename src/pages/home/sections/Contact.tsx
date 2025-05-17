import React, { useState } from 'react';
import { IoCallOutline } from 'react-icons/io5';
import { MdOutlineEmail } from 'react-icons/md';
import { Img as ReactImage } from 'react-image';
import { Btn } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/InputField';
import { Text } from '../../../components/ui/TextComp';
import { WEB_PAGES } from '../../../utils/constants';
import { ENDPOINTS_API_PATH } from '../../../utils/endpoints';
import usePageContent from '../../../hooks/usePageContent';
import { TextArea } from '../../../components/ui/TextAreaField';
import { toast } from 'react-toastify';
import { UseValidate } from '../../../hooks/useValidation';

const Contact = () => {
  const {
    content: faqData,
    loading,
    error,
  } = usePageContent(
    `${ENDPOINTS_API_PATH.page}`,
    `${WEB_PAGES.contact}`,
    'PhoneAndEmail'
  );

  const ContactInfo = [
    { icon: <IoCallOutline /> },
    { icon: <MdOutlineEmail /> },
  ];

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
    <section
      id="contact"
      className="bg-[#FFF8F2] w-full py-18 lg:py-30 gap-10 px-4 md:px-8 lg:px-28 "
    >
      <div className="flex flex-col lg:flex-row w-full gap-8 lg:!h-[860px]  max-w-7xl mx-auto">
        <div className="flex flex-col lg:w-1/2 h-full bg-white rounded-2xl p-8">
          <div
            className={`cursor-pointer bg-gradient-to-r from-white  from-[05%] to-[98%]  to-[#CECECE20] border border-[#E4E4E7] py-3 px-3.5 w-fit rounded-[60px] font-poppins text-neutral-800 uppercase`}
          >
            Get in Touch
          </div>
          <div className="mt-3 flex flex-col gap-2 w-full">
            <Text
              as="h1"
              weight="bold"
              size="4xl"
              color="text-neutral-800"
              className="font-grotesk font-bold text-4xl text-lg:text-[56px]"
            >
              Let's chat, Reach Out to Us
            </Text>
            <Text
              weight="normal"
              size="base"
              color="text-neutral-500"
              className=" font-work lg:max-w-[520px] text-base "
            >
              Have a question or feedback? We are here to help. Send us a
              message, and we'll respond in 24 hours.
            </Text>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-5 flex flex-col flex-grow w-full h-full gap-4"
          >
            <div className="flex w-full gap-4 lg:gap-6">
              <Input
                label="First Name"
                type="text"
                name="firstname"
                value={formData.firstname}
                error={errors.firstname}
                onChange={handleChange}
                placeholder="First Name"
                className="bg-[#F3F3F3] w-full h-13 rounded-sm placeholder:text-[#B7B7B7] placeholder:"
              />
              <Input
                label="Last Name"
                type="text"
                name="lastname"
                value={formData.lastname}
                error={formData.lastname}
                onChange={handleChange}
                placeholder="Last Name"
                className="bg-[#F3F3F3] w-full h-13 rounded-sm placeholder:text-[#B7B7B7] placeholder:"
              />
            </div>
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              error={errors.email}
              onChange={handleChange}
              placeholder="email"
              className="bg-[#F3F3F3] w-full h-13 rounded-sm placeholder:text-[#B7B7B7] placeholder:"
            />
            <Input
              label="Phone Number"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="bg-[#F3F3F3] w-full h-13 rounded-sm placeholder:text-[#B7B7B7] placeholder:"
            />
            <div className="flex flex-col flex-grow h-full">
              <TextArea
                label="Message"
                name="message"
                value={formData.message}
                error={errors.message}
                onChange={handleChange}
                placeholder="Leave us a message..."
                className=" bg-[#F3F3F3]  flex h-[245px]  rounded-sm placeholder:text-[#B7B7B7] placeholder:"
              />
            </div>
            <Btn
              type="submit"
              className="bg-gradient-to-b text-nowrap py-3 from-[#FF9040] to-[#FF6B00] w-full text-base text-white"
            >
              Send Message
            </Btn>
          </form>
        </div>

        <div className="flex flex-col lg:w-1/2 h-full gap-8">
          <div className="bg-white w-full h-[72%] rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 ease-in-out ">
            <ReactImage
              src={'/contact.svg'}
              alt="contact"
              className="w-full h-full block object-cover object-center"
            />
          </div>

          {loading && <p>Loading Contact...</p>}
          {error && <p>Error fetching Contact: {error}</p>}
          
          <div className=" bg-white w-full h-[28%] rounded-2xl px-4 py-6 lg:px-8 lg:py-8 ">
            <div className="flex flex-col w-full gap-4">
              {faqData?.RowValue?.split(';').map(
                (item: string, index: number) => (
                  <div
                    key={item}
                    className="flex w-full h-20 px-5 items-center bg-[#F3F3F3] rounded-2xl gap-2 text-nowrap font-work font-normal text-[#15141F] text-base sm:text-xl hover:scale-105 transition-all duration-300 ease-in-out"
                  >
                    <div className="bg-[#0D3180] flex items-center justify-center w-10 h-10 border-4 border-[#0D3180/30] rounded-full text-white text-base box-border">
                      {ContactInfo[index]?.icon}
                    </div>
                    {item}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;