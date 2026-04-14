import { createFileRoute, Link } from "@tanstack/react-router";
import { User, Mail, Phone, Heart, Edit2, X, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Elomaze" },
      { name: "description", content: "Your Elomaze profile." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const [showEdit, setShowEdit] = useState(false);
  const [name, setName] = useState("Adaeze Nwosu");
  const [email, setEmail] = useState("adaeze@example.com");
  const [phone, setPhone] = useState("+234 801 234 5678");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowEdit(false);
    toast.success("Profile updated successfully!");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 pb-24 lg:pb-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-8">Profile</h1>

      <div className="rounded-2xl border border-border premium-shadow p-6 sm:p-8 mb-6">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-primary" />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{name}</h2>
            <p className="text-sm text-muted-foreground">Member since 2025</p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm text-foreground">{email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="text-sm text-foreground">{phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Heart className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Saved Properties</p>
              <Link to="/saved" className="text-sm text-primary font-medium hover:underline">3 saved homes</Link>
            </div>
          </div>
        </div>

        <Button variant="outline" className="mt-8 gap-2" onClick={() => setShowEdit(true)}>
          <Edit2 className="w-4 h-4" />
          Edit Profile
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <Link to="/saved" className="px-4 py-3 text-sm font-medium text-foreground rounded-xl hover:bg-secondary transition-colors border border-border">
          Saved Properties
        </Link>
        <Link to="/messages" className="px-4 py-3 text-sm font-medium text-foreground rounded-xl hover:bg-secondary transition-colors border border-border">
          Messages
        </Link>
      </div>

      {/* Edit Modal */}
      {showEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-foreground/30 backdrop-blur-sm" onClick={() => setShowEdit(false)}>
          <div className="bg-background rounded-2xl border border-border premium-shadow p-6 sm:p-8 w-full max-w-md animate-fade-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-foreground">Edit Profile</h2>
              <button onClick={() => setShowEdit(false)} className="p-1.5 rounded-lg hover:bg-secondary"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="flex justify-center mb-4">
                <label className="relative cursor-pointer">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-8 h-8 text-primary" />
                    )}
                  </div>
                  <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                    <Camera className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full h-11 px-4 rounded-full border border-input bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setShowEdit(false)}>Cancel</Button>
                <Button type="submit" variant="premium" className="flex-1">Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
