"use client";

import { useCallback, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUpdateUser } from "@/hooks/mutations/user/useUpdateUser";
import { User } from "@/utils/interfaces/user";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface AvatarSelectorProps {
  user: User;
}

const AvatarSelector = ({ user }: AvatarSelectorProps) => {
  const [seed, setSeed] = useState(Math.random().toString(36).substring(7));
  const [isGenerating, setIsGenerating] = useState(false);
  const { mutate: updateUser, isPending } = useUpdateUser();

  const generateNewAvatar = useCallback(() => {
    if (isGenerating) {
      toast.warning("Please wait before generating another avatar", {
        description: "Wait a few seconds before trying again",
      });
      return;
    }

    setIsGenerating(true);
    const newSeed = Math.random().toString(36).substring(7);
    setSeed(newSeed);
    updateUser({ avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${newSeed}` });

    setTimeout(() => {
      setIsGenerating(false);
    }, 300);
  }, [isGenerating, updateUser]);

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="h-20 w-20">
        <AvatarImage
          src={user.avatar ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`}
          alt={user.name ?? "User"}
        />
        <AvatarFallback>{user.name?.charAt(0) ?? "?"}</AvatarFallback>
      </Avatar>
      <Button
        variant="outline"
        size="sm"
        onClick={generateNewAvatar}
        disabled={isPending || isGenerating}
        className="flex items-center gap-2"
      >
        <RefreshCw className={`h-4 w-4 ${isGenerating ? "animate-spin" : ""}`} />
        {isPending || isGenerating ? "Generating..." : "Generate New Avatar"}
      </Button>
    </div>
  );
};

export default AvatarSelector;
