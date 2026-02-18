import { UserX, UserCheck } from 'lucide-react';

export default function InactiveUsersTable({ teachers, advisoryMembers }) {
    // Combine inactive teachers and advisory members
    const inactiveTeachers = (teachers || [])
        .filter(t => !t.isActive)
        .map(t => ({
            ...t,
            role: 'Teacher',
            avatar: t.image_url
        }));

    const inactiveAdvisory = (advisoryMembers || [])
        .filter(a => !a.isActive)
        .map(a => ({
            ...a,
            role: 'Advisory',
            avatar: a.image_url
        }));

    const inactiveUsers = [...inactiveTeachers, ...inactiveAdvisory].sort((a, b) =>
        a.name.localeCompare(b.name)
    );

    if (inactiveUsers.length === 0) {
        return (
            <div className="text-center py-8 text-gray-400 text-sm">
                <div className="flex flex-col items-center gap-2">
                    <div className="size-12 rounded-full bg-green-50 flex items-center justify-center">
                        <UserCheck className="size-6 text-green-600" />
                    </div>
                    <p className="font-medium">All staff members are active!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <UserX className="size-3.5" />
                Inactive Users ({inactiveUsers.length})
            </h4>
            <div className="overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                                User
                            </th>
                            <th className="text-left py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                                Designation
                            </th>
                            <th className="text-left py-3 px-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {inactiveUsers.map((user, index) => (
                            <tr key={`${user.role}-${user.id || index}`} className="hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={user.avatar || '/placeholder-avatar.png'}
                                            alt={user.name}
                                            className="size-8 rounded-full object-cover border-2 border-gray-200"
                                            onError={(e) => {
                                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=e5e7eb&color=6b7280&size=128`;
                                            }}
                                        />
                                        <span className="font-medium text-gray-900">{user.name}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-4 text-gray-600">
                                    {user.designation || 'Not specified'}
                                </td>
                                <td className="py-3 px-4">
                                    <span className={`inline-flex px-2 py-1 rounded-md text-[10px] font-bold ${user.role === 'Teacher'
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'bg-purple-50 text-purple-700'
                                        }`}>
                                        {user.role}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
