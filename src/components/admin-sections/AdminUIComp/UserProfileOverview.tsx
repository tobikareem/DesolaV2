import React from 'react';
import { BadgeCheck, User } from 'lucide-react';
import { Btn } from '../../ui/Button';
import { Text } from '../../ui/TextComp';

export default function UserProfileOverview() {
  const mockUser = {
    email: 'sarah.johnson@example.com',
    accountStatus: 'Active',
    signUpMethod: 'Google',
    userId: 'USR-4582',
    profileCompletion: 85,
    memberSince: '2023-08-15',
  };

  

  const {
    email,
    accountStatus,
    signUpMethod,
    userId,
    profileCompletion,
    memberSince,
  } = mockUser;

  return (
    <div className="bg-white p-2 md:p-4 lg:p-6 rounded-lg shadow mt-6 space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="flex items-center gap-2 mb-4">
          <User />
          <Text
            as="h2"
            size="lg"
            weight="medium"
            fontStyle="font-grotesk"
            className=" text-neutral-800 md:text-xl lg:text-2xl"
          >
            User Profile Overview
          </Text>
        </div>
        <div className="flex gap-2">
          <Btn size='sm' weight='normal' className="!text-xs md:text-base md:h-12 px-4 py-2 border rounded-md hover:bg-gray-100">
            Reset Password
          </Btn>
          <Btn size='sm' weight='normal' className="text-xs md:text-base md:h-12 px-4 py-2 border rounded-md hover:bg-gray-100">
            Suspend Account
          </Btn>
          <Btn size='sm' weight='normal' className="text-xs md:text-base md:h-12 px-4 py-2 border rounded-md hover:bg-gray-100">
            Send Email
          </Btn>
        </div>
      </div>

      <div className="text-sm text-gray-700">
        <div className="flex flex-col md:flex-row gap-2 items-center justify-between">
          <div className='text-center md:text-left'>
            <Text as='p' size='sm' weight='medium' className="font-medium">Email Address</Text>
            <Text as='p' size='xs' className=" text-gray-900">{email}</Text>
          </div>
          <div className='flex gap-3 w-full md:w-fit justify-center'>
            <div className=''>
              <Text as="p" size="sm" weight="medium">
                Account Status
              </Text>
              <span className="inline-flex items-center p-1 px-2 text-xs font-medium rounded-full bg-green-100 text-green-700">
                <BadgeCheck className="w-3 h-3 mr-1" />
                {accountStatus}
              </span>
            </div>
            <div className="">
              <p className="font-medium">Profile Completion</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1 mb-1">
                <div
                  className="bg-indigo-700 h-2 rounded-full"
                  style={{ width: `${profileCompletion}%` }}
                />
              </div>
              <Text as="p" size="sm" className=" text-gray-500">
                {profileCompletion}% complete
              </Text>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-1 items-center md:justify-between mt-6">
          <div className='text-center md:text-left'>
            <Text as="p" size="xs" weight="medium" className='md:text-sm'>
              Sign-up Method
            </Text>
            <span className="inline-block border rounded-full mt-1 px-3 py-1 text-xs text-gray-600">
              {signUpMethod}
            </span>
          </div>

          <div className='text-center'>
            <Text as="p" weight="medium" size="sm">
              User ID
            </Text>
            <Text as="p" weight="medium" size="xs" className="text-gray-900">
              {userId}
            </Text>
          </div>
          <div className="border p-1 text-center md:text-right">
            <Text as="p" weight="medium" size="sm">
              Member Since
            </Text>
            <Text as='p' size='xs' className="text-gray-900">{memberSince}</Text>
          </div>
        </div>
      </div>
    </div>
  );
}
