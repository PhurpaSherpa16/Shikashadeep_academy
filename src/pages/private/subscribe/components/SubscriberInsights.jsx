import { Mails, TrendingUp, Clock, AlertCircle } from 'lucide-react';

export default function SubscriberInsights({ totalItems }) {
    const totalSubscribers = totalItems || 0;

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                Subscriber Insights
            </h3>

            <div className="grid grid-cols-1 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start justify-between">
                    <div>
                        <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Total Subscribers</p>
                        <h4 className="text-3xl font-bold text-blue-600">{totalSubscribers}</h4>
                        <p className="text-xs text-gray-400 mt-1">Active audience size</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                        <Mails className="w-5 h-5" />
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start justify-between">
                    <div>
                        <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">Status</p>
                        <h4 className="text-lg font-bold text-gray-900">Live</h4>
                        <p className="text-xs text-gray-400 mt-1">System is healthy</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-xl text-green-600">
                        <Clock className="w-5 h-5" />
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-6 text-white shadow-lg overflow-hidden relative">
                <div className="relative z-10">
                    <h4 className="text-xl font-bold mb-2">Grow Your List</h4>
                    <p className="text-indigo-100 text-sm mb-6 max-w-[80%]">
                        Connect with your audience. Keep them engaged with targeted email updates.
                    </p>
                    <button className="bg-white text-indigo-600 text-xs font-bold px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                        Manage Campaigns
                    </button>
                </div>

                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            </div>
        </div>
    );
}
