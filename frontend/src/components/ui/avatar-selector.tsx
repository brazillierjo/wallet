"use client";

import { useCallback, useRef, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUpdateUser } from "@/hooks/mutations/user/useUpdateUser";
import { User } from "@/utils/interfaces/user";
import { RefreshCw, Upload } from "lucide-react";
import { toast } from "sonner";

interface AvatarSelectorProps {
  user: User;
}

const AvatarSelector = ({ user }: AvatarSelectorProps) => {
  const [seed, setSeed] = useState(Math.random().toString(36).substring(7));
  const [isGenerating, setIsGenerating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Vérifier le type de fichier
      if (!file.type.startsWith("image/")) {
        toast.error("Invalid file type", {
          description: "Please upload an image file",
        });
        return;
      }

      // Vérifier la taille du fichier (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File too large", {
          description: "Please upload an image smaller than 2MB",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({ avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    },
    [updateUser]
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <Avatar className="h-28 w-28 cursor-pointer">
          <AvatarImage
            src={user.avatar ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`}
            alt={user.name ?? "User"}
          />
          <AvatarFallback>{user.name?.charAt(0) ?? "?"}</AvatarFallback>
        </Avatar>

        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
            <Button variant="ghost" className="w-10/12" size="sm" onClick={() => fileInputRef.current?.click()}>
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </div>
        )}

        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={generateNewAvatar}
        disabled={isPending || isGenerating}
        className="flex items-center gap-2"
      >
        <RefreshCw className={`h-4 w-4 ${isGenerating ? "animate-spin" : ""}`} />
        {isPending || isGenerating ? "Generating..." : "Generate new avatar"}
      </Button>
    </div>
  );
};

export default AvatarSelector;
