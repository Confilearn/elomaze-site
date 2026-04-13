import { createFileRoute } from "@tanstack/react-router";
import { Search, MoreHorizontal, BadgeCheck, Ban, Eye, Trash2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsersPage,
});

const demoUsers = [
  { id: "u1", name: "Chidi Okafor", email: "chidi@email.com", role: "Agent", status: "Active", joined: "Jan 12, 2026", trust: 95, avatar: "CO" },
  { id: "u2", name: "Amina Bello", email: "amina@email.com", role: "Agent", status: "Active", joined: "Feb 3, 2026", trust: 92, avatar: "AB" },
  { id: "u3", name: "Emeka Nwosu", email: "emeka@email.com", role: "User", status: "Active", joined: "Mar 15, 2026", trust: 78, avatar: "EN" },
  { id: "u4", name: "Folake Adebayo", email: "folake@email.com", role: "Agent", status: "Suspended", joined: "Dec 8, 2025", trust: 45, avatar: "FA" },
  { id: "u5", name: "Uche Obi", email: "uche@email.com", role: "User", status: "Active", joined: "Apr 1, 2026", trust: 88, avatar: "UO" },
  { id: "u6", name: "Halima Yusuf", email: "halima@email.com", role: "Admin", status: "Active", joined: "Nov 20, 2025", trust: 100, avatar: "HY" },
  { id: "u7", name: "Blessing Okoh", email: "blessing@email.com", role: "User", status: "Active", joined: "Mar 28, 2026", trust: 82, avatar: "BO" },
  { id: "u8", name: "Kola Bankole", email: "kola@email.com", role: "Agent", status: "Active", joined: "Feb 14, 2026", trust: 90, avatar: "KB" },
  { id: "u9", name: "Ifeoma Nwachukwu", email: "ifeoma@email.com", role: "User", status: "Active", joined: "Jan 5, 2026", trust: 74, avatar: "IN" },
  { id: "u10", name: "Yemi Alade", email: "yemi@email.com", role: "Agent", status: "Pending", joined: "Apr 10, 2026", trust: 60, avatar: "YA" },
];

function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtered = demoUsers.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "All" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Users</h2>
        <p className="text-sm text-muted-foreground">Manage platform users and agents</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search users..." className="w-full h-10 pl-10 pr-4 rounded-xl bg-secondary border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="h-10 px-3 rounded-xl bg-secondary border-0 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="All">All Roles</option>
          <option value="User">User</option>
          <option value="Agent">Agent</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      {/* Table */}
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
              {filtered.map((user) => (
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
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-foreground hover:bg-secondary" onClick={() => setOpenMenu(null)}>
                            <Eye className="w-3 h-3" /> View Profile
                          </button>
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-foreground hover:bg-secondary" onClick={() => setOpenMenu(null)}>
                            <BadgeCheck className="w-3 h-3" /> Verify
                          </button>
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-foreground hover:bg-secondary" onClick={() => setOpenMenu(null)}>
                            <Ban className="w-3 h-3" /> Suspend
                          </button>
                          <button className="flex items-center gap-2 w-full px-3 py-2 text-xs text-destructive hover:bg-destructive/10" onClick={() => setOpenMenu(null)}>
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
    </div>
  );
}
