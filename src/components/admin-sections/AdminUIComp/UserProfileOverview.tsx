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
    <div className="bg-white p-6 rounded-lg shadow mt-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <User />
          <Text
            as="h2"
            size="2xl"
            weight="medium"
            fontStyle="font-grotesk"
            className=" text-neutral-800"
          >
            User Profile Overview
          </Text>
        </div>
        <div className="flex gap-2">
          <Btn className="px-4 py-2 border rounded-md hover:bg-gray-100">
            Reset Password
          </Btn>
          <Btn className="px-4 py-2 border rounded-md hover:bg-gray-100">
            Suspend Account
          </Btn>
          <Btn className="px-4 py-2 border rounded-md hover:bg-gray-100">
            Send Email
          </Btn>
        </div>
      </div>

      <div className=" text-sm text-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <Text as='p' size='sm' weight='medium' className="font-medium">Email Address</Text>
            <Text as='p' size='xs' className="text-gray-900">{email}</Text>
          </div>
          <div>
            <Text as="p" size="sm" weight="medium">
              Account Status
            </Text>
            <span className="inline-flex items-center  py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
              <BadgeCheck className="w-3 h-3 mr-1" />
              {accountStatus}
            </span>
          </div>
          <div className="col-span-2">
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

        <div className="flex items-center justify-between mt-6">
          <div>
            <Text as="p" size="sm" weight="medium">
              Sign-up Method
            </Text>
            <span className="inline-block border rounded-full mt-1 px-3 py-1 text-xs text-gray-600">
              {signUpMethod}
            </span>
          </div>

          <div>
            <Text as="p" weight="medium" size="sm">
              User ID
            </Text>
            <Text as="p" weight="medium" size="xs" className="text-gray-900">
              {userId}
            </Text>
          </div>
          <div className="flex flex-col items-start border">
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
