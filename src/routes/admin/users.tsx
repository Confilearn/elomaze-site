import { createFileRoute } from "@tanstack/react-router";
import { Search, MoreHorizontal, BadgeCheck, Ban, Eye, Trash2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsersPage,
});

const initialUsers = [
  { id: "u1", name: "Chidi Okafor", email: "chidi@email.com", role: "Agent", status: "Active", joined: "Jan 12, 2026", trust: 95, avatar: "CO", phone: "+234 801 234 5678" },
  { id: "u2", name: "Amina Bello", email: "amina@email.com", role: "Agent", status: "Active", joined: "Feb 3, 2026", trust: 92, avatar: "AB", phone: "+234 802 345 6789" },
  { id: "u3", name: "Emeka Nwosu", email: "emeka@email.com", role: "User", status: "Active", joined: "Mar 15, 2026", trust: 78, avatar: "EN", phone: "+234 803 456 7890" },
  { id: "u4", name: "Folake Adebayo", email: "folake@email.com", role: "Agent", status: "Suspended", joined: "Dec 8, 2025", trust: 45, avatar: "FA", phone: "+234 804 567 8901" },
  { id: "u5", name: "Uche Obi", email: "uche@email.com", role: "User", status: "Active", joined: "Apr 1, 2026", trust: 88, avatar: "UO", phone: "+234 805 678 9012" },
  { id: "u6", name: "Halima Yusuf", email: "halima@email.com", role: "Admin", status: "Active", joined: "Nov 20, 2025", trust: 100, avatar: "HY", phone: "+234 806 789 0123" },
  { id: "u7", name: "Blessing Okoh", email: "blessing@email.com", role: "User", status: "Active", joined: "Mar 28, 2026", trust: 82, avatar: "BO", phone: "+234 807 890 1234" },
  { id: "u8", name: "Kola Bankole", email: "kola@email.com", role: "Agent", status: "Active", joined: "Feb 14, 2026", trust: 90, avatar: "KB", phone: "+234 808 901 2345" },
  { id: "u9", name: "Ifeoma Nwachukwu", email: "ifeoma@email.com", role: "User", status: "Active", joined: "Jan 5, 2026", trust: 74, avatar: "IN", phone: "+234 809 012 3456" },
  { id: "u10", name: "Yemi Alade", email: "yemi@email.com", role: "Agent", status: "Pending", joined: "Apr 10, 2026", trust: 60, avatar: "YA", phone: "+234 810 123 4567" },
  { id: "u11", name: "Oluchi Eze", email: "oluchi@email.com", role: "User", status: "Active", joined: "Mar 1, 2026", trust: 85, avatar: "OE", phone: "+234 811 234 5678" },
  { id: "u12", name: "Tunde Adeyemi", email: "tunde@email.com", role: "Agent", status: "Active", joined: "Feb 20, 2026", trust: 91, avatar: "TA", phone: "+234 812 345 6789" },
  { id: "u13", name: "Ngozi Ibe", email: "ngozi@email.com", role: "User", status: "Active", joined: "Jan 18, 2026", trust: 80, avatar: "NI", phone: "+234 813 456 7890" },
  { id: "u14", name: "Efe Okoro", email: "efe@email.com", role: "Agent", status: "Active", joined: "Dec 15, 2025", trust: 93, avatar: "EO", phone: "+234 814 567 8901" },
  { id: "u15", name: "Chioma Eze", email: "chioma@email.com", role: "User", status: "Suspended", joined: "Nov 5, 2025", trust: 40, avatar: "CE", phone: "+234 815 678 9012" },
];

const ITEMS_PER_PAGE = 8;

function AdminUsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [viewUser, setViewUser] = useState<typeof initialUsers[0] | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "All" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleVerify = (id: string) => {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: "Active", trust: Math.min(u.trust + 10, 100) } : u));
    setOpenMenu(null);
    toast.success("User verified successfully!");
  };

  const handleSuspend = (id: string) => {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: u.status === "Suspended" ? "Active" : "Suspended" } : u));
    setOpenMenu(null);
    const user = users.find((u) => u.id === id);
    toast.success(user?.status === "Suspended" ? "User reactivated!" : "User suspended!");
  };

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setDeleteConfirm(null);
    toast.success("User deleted successfully!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Users</h2>
        <p className="text-sm text-muted-foreground">Manage platform users and agents</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} placeholder="Search users..." className="w-full h-10 pl-10 pr-4 rounded-xl bg-secondary border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <select value={roleFilter} onChange={(e) => { setRoleFilter(e.target.value); setCurrentPage(1); }} className="h-10 px-3 rounded-xl bg-secondary border-0 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="All">All Roles</option>
          <option value="User">User</option>
          <option value="Agent">Agent</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <div className="bg-card rounded-2xl border border-border/50 overflow-hidden premium-shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 bg-secondary/30">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">User</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Role</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Status</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Joined</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Trust</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((user) => (
                <tr key={user.id} className="border-b border-border/30 last:border-0 hover:bg-secondary/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-primary">{user.avatar}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${user.role === "Admin" ? "bg-primary/10 text-primary" : user.role === "Agent" ? "bg-success/10 text-success" : "bg-secondary text-muted-foreground"}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${user.status === "Active" ? "bg-success/10 text-success" : user.status === "Suspended" ? "bg-destructive/10 text-destructive" : "bg-warning/10 text-warning-foreground"}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground hidden lg:table-cell">{user.joined}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${user.trust}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{user.trust}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="relative inline-block">
                      <button onClick={() => setOpenMenu(openMenu === user.id ? null : user.id)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                      </button>
                      {openMenu === user.id && (
                        <div className="absolute right-0 mt-1 w-40 bg-card border border-border rounded-xl shadow-lg z-10 overflow-hidden">
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-foreground hover:bg-secondary" onClick={() => { setViewUser(user); setOpenMenu(null); }}>
                            <Eye className="w-3 h-3" /> View Profile
                          </button>
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-foreground hover:bg-secondary" onClick={() => handleVerify(user.id)}>
                            <BadgeCheck className="w-3 h-3" /> Verify
                          </button>
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-foreground hover:bg-secondary" onClick={() => handleSuspend(user.id)}>
                            <Ban className="w-3 h-3" /> {user.status === "Suspended" ? "Reactivate" : "Suspend"}
                          </button>
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-destructive hover:bg-destructive/10" onClick={() => { setDeleteConfirm(user.id); setOpenMenu(null); }}>
                            <Trash2 className="w-3 h-3" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm text-muted-foreground">Page {currentPage} of {totalPages}</span>
          <Button variant="outline" size="icon" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* View Profile Modal */}
      {viewUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-foreground/30 backdrop-blur-sm" onClick={() => setViewUser(null)}>
          <div className="bg-background rounded-2xl border border-border premium-shadow p-6 w-full max-w-md animate-fade-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-foreground">User Profile</h2>
              <button onClick={() => setViewUser(null)} className="p-1.5 rounded-lg hover:bg-secondary"><X className="w-4 h-4" /></button>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg font-bold text-primary">{viewUser.avatar}</span>
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">{viewUser.name}</h3>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${viewUser.role === "Admin" ? "bg-primary/10 text-primary" : viewUser.role === "Agent" ? "bg-success/10 text-success" : "bg-secondary text-muted-foreground"}`}>{viewUser.role}</span>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span className="text-foreground">{viewUser.email}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Phone</span><span className="text-foreground">{viewUser.phone}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className={viewUser.status === "Active" ? "text-success" : "text-destructive"}>{viewUser.status}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Joined</span><span className="text-foreground">{viewUser.joined}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Trust Score</span><span className="text-foreground">{viewUser.trust}%</span></div>
            </div>
            <Button variant="outline" className="w-full mt-6" onClick={() => setViewUser(null)}>Close</Button>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-foreground/30 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-background rounded-2xl border border-border premium-shadow p-6 w-full max-w-sm animate-fade-up text-center" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-destructive" />
            </div>
            <h2 className="text-lg font-bold text-foreground mb-2">Delete User?</h2>
            <p className="text-sm text-muted-foreground mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
              <Button variant="destructive" className="flex-1" onClick={() => handleDelete(deleteConfirm)}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
