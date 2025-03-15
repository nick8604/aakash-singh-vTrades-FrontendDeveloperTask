// 'use client';

// import { useSession, signOut } from 'next-auth/react';
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';

// export default function DashboardPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.push('/login');
//     }
//   }, [status, router]);

//   if (status === 'loading') {
//     return (
//       <div className="flex h-screen items-center justify-center bg-[#171923]">
//         <div className="animate-spin h-10 w-10 border-4 border-purple-500 rounded-full border-t-transparent"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="bg-purple-600 text-white py-4">
//         <div className="container mx-auto px-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold">WORKHIVE</h1>
//           <div className="flex items-center gap-4">
//             {session?.user?.image && (
//               <div className="relative w-10 h-10 rounded-full overflow-hidden">
//                 <Image
//                   src={session.user.image}
//                   alt={session.user.name || 'User'}
//                   fill
//                   sizes="40px"
//                   className="object-cover"
//                 />
//               </div>
//             )}
//             <div>
//               <p className="font-medium">{session?.user?.name}</p>
//               <p className="text-sm opacity-75">{session?.user?.email}</p>
//             </div>
//             <button 
//               onClick={() => signOut({ callbackUrl: '/login' })}
//               className="ml-4 px-4 py-2 bg-purple-700 rounded-lg hover:bg-purple-800 transition-colors"
//             >
//               Sign Out
//             </button>
//           </div>
//         </div>
//       </div>
      
//       <div className="container mx-auto px-4 py-8">
//         <h2 className="text-2xl font-bold mb-6">Welcome to your Dashboard</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-lg font-semibold mb-4">Employee Management</h3>
//             <p className="text-gray-600 mb-4">View and manage employee profiles, track performance, and oversee attendance.</p>
//             <button className="text-purple-600 font-medium">View Employees →</button>
//           </div>
          
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-lg font-semibold mb-4">Performance Insights</h3>
//             <p className="text-gray-600 mb-4">Analyze team goals, track progress, and monitor achievements.</p>
//             <button className="text-purple-600 font-medium">View Insights →</button>
//           </div>
          
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-lg font-semibold mb-4">Attendance & Leaves</h3>
//             <p className="text-gray-600 mb-4">Track attendance patterns and manage leave requests effortlessly.</p>
//             <button className="text-purple-600 font-medium">View Attendance →</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// } 