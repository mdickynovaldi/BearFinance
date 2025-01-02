"use client";

import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IUser } from "@/interfaces";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface EditProfileDialogProps {
  user: IUser | null;
  loading: boolean;
  onSave: () => Promise<void>;
  setName: (name: string) => void;
  setSelectedFile: (file: File) => void;
}

const updateProfileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  profile_pic: z.string().optional(),
});

type UpdateProfileForm = z.infer<typeof updateProfileSchema>;

export function EditProfileDialog({
  user,
  loading,
  onSave,
  setName,
  setSelectedFile,
}: EditProfileDialogProps) {
  const form = useForm<UpdateProfileForm>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name || "",
      profile_pic: user?.profile_pic || "",
    },
  });

  const onSubmit = async (values: UpdateProfileForm) => {
    setName(values.name);
    await onSave();
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                {...form.register("name")}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="profile_pic" className="text-right">
                Profile Picture
              </Label>
              <Input
                id="profile_pic"
                type="file"
                className="col-span-3"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? <Loader /> : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
