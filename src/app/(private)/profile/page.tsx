"use client";

import { Loader } from "@/components/ui/loader";

import { IUser } from "@/interfaces";
import { getLoginUser } from "@/lib/users";
import React, { useEffect, useState } from "react";
import { uploadFile } from "@/helpers/storage-helpers";
import { toast } from "@/hooks/use-toast";
import { createClient } from "@/config/supabase-browser-config";
import { EditProfileDialog } from "./_components/dialog-update-profile";
import { ChangePasswordDialog } from "./_components/dialog-change-password";

export default function ProfilePage() {
  const [user, setUser] = React.useState<IUser | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [name, setName] = React.useState(user?.name);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const onSave = async () => {
    try {
      setLoading(true);
      let newProfilePicUrl = user?.profile_pic;
      if (selectedFile) {
        console.log("Uploading file:", selectedFile);
        const response = await uploadFile(selectedFile);
        console.log("Upload response:", response);
        if (!response) {
          toast({
            title: "Failed to upload file",
            description: "Please try again",
          });
          return;
        }
        newProfilePicUrl = response;
        console.log("newProfilePicUrl", newProfilePicUrl);
      }

      const supabaseBrowserConfig = createClient();
      const { data, error } = await supabaseBrowserConfig
        .from("user_profiles")
        .update({
          name: name,
          profile_pic: newProfilePicUrl,
        })
        .eq("id", user?.id);
      if (error) {
        throw error;
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been updated",
      });

      // Refresh data setelah update berhasil
      await fetchUser();
    } catch (error) {
      console.error("onSave error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response: any = await getLoginUser();
      if (response.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChangePassword = async (
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    try {
      setLoading(true);
      const supabaseBrowserConfig = createClient();
      if (newPassword !== confirmPassword) {
        throw new Error("New password and confirm password do not match!");
      }
      const { error } = await supabaseBrowserConfig.auth.updateUser({
        password: newPassword,
      });

      toast({
        title: "Password successfully changed!",
        description: "Your password has been updated",
      });
    } catch (error) {
      toast({
        title: "Failed to change password",
        description: "Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="p-12">
      <h1 className="text-2xl font-bold text-center">Welcome {user?.name}</h1>
      <div className="mt-12 flex flex-row gap-4">
        <div className="flex flex-col col-span-1 gap-5 justify-center items-center p-5 rounded-lg border border-gray-200 w-96 h-96">
          <img
            src={
              user?.profile_pic || "https://picsum.photos/seed/picsum/200/300"
            }
            alt="profile picture"
            className="w-40 h-40 rounded-full"
          />
          <p className="text-3xl font-bold uppercase">{user?.name}</p>
        </div>
        <div className="flex flex-col gap-5 justify-center  p-5 rounded-lg border border-gray-200 w-full h-96">
          <div className="col-span-3">
            <div className=" grid-cols-3 gap-4 grid col-span-3">
              <div className="col-span-1">
                <p className="text-xl">ID</p>
                <p className="text-xl">{user?.id}</p>
              </div>
              <div className="col-span-1">
                <p className="text-3xl font-bold">Email</p>
                <p className="text-xl">{user?.email}</p>
              </div>
              <div className="col-span-1">
                <p className="text-3xl font-bold">Email Verified At</p>
                <p className="text-xl">{user?.email_confirmed_at}</p>
              </div>
              <div className="col-span-1">
                <p className="text-3xl font-bold">Last Sign In At</p>
                <p className="text-xl">{user?.last_sign_in_at}</p>
              </div>
              <div className="col-span-1">
                <p className="text-3xl font-bold">Created At</p>
                <p className="text-xl">{user?.created_at}</p>
              </div>
              <div className="col-span-1">
                <p className="text-3xl font-bold">Updated At</p>
                <p className="text-xl">{user?.updated_at}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-end mt-12">
        <EditProfileDialog
          user={user}
          loading={loading}
          onSave={onSave}
          setName={setName}
          setSelectedFile={setSelectedFile}
        />
        <ChangePasswordDialog
          loading={loading}
          onChangePassword={handleChangePassword}
        />
      </div>
    </section>
  );
}
