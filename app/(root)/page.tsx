import React from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

import InterviewCard from "@/components/InterviewCard";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewsByUserId, getLatestInterviews } from "@/lib/actions/general.action";
import { signOut } from "@/lib/actions/auth.action";

const Page = async () => {
    // Fetch current user data and interviews asynchronously
    const user = await getCurrentUser();
    if (!user) {
        // Handle the case where the user is not logged in (optional)
        return <div>You need to sign in first</div>;
    }

    const [userInterviews, latestInterviews] = await Promise.all([
        getInterviewsByUserId(user?.id!),
        getLatestInterviews({ userId: user?.id! })
    ]);

    const hasPastInterviews = userInterviews?.length > 0;
    const hasUpcomingInterviews = latestInterviews?.length > 0;

    return (
        <>
            {/* Top-right logout button */}

            <div className="flex justify-between items-center w-full relative">
                {/* Greeting centered */}
                <p className="text-xl font-semibold text-indigo-100 -tracking-tighter flex-grow text-center">
                    Hey, {user.name?.split(' ')[0] || 'Guest'} 👋! Ready to conquer your mock interview?
                </p>

                {/* Sign Out Button on the right */}
                <button
                    type="button"
                    onClick={signOut} // Call the signOut function on click
                    className="btn-primary bg-lightblue-400 text-white px-6 py-2 rounded-lg hover:bg-lightblue-500 transition-all duration-300 -mt-35"
                >
                    Sign Out
                </button>
            </div>










            {/* Rest of your homepage */}
            <section className="card-cta">
                <div className="flex flex-col gap-6 max-w-lg">
                    <h2> Get Interview-Ready with AI-Powered Practice and Feedback</h2>
                    <p className="text-lg">
                        Practice on real interview questions & get instant feedback
                    </p>
                    <Button asChild className="btn-primary max-sm:w-full">
                        <Link href="/interview"> Start an Interview</Link>
                    </Button>
                </div>
                <Image src="/robot.png" alt="robo-dude" width={400} height={400} className="max-sm:hidden" />
            </section>

            {/* Display interviews */}
            <section className="flex flex-col gap-6 mt-8">
                <h2> Your Interviews</h2>
                <div className="interviews-section">
                    {hasPastInterviews ? (
                        userInterviews?.map((interview) => (
                            <InterviewCard {...interview} key={interview.id} />
                        ))
                    ) : (
                        <p> You have not taken any interviews yet</p>
                    )}
                </div>
            </section>

            <section className="flex flex-col gap-6 mt-8">
                <h2> Take an Interview</h2>
                <div className="interviews-section">
                    {hasUpcomingInterviews ? (
                        latestInterviews?.map((interview) => (
                            <InterviewCard {...interview} key={interview.id} />
                        ))
                    ) : (
                        <p> There are no new interviews available</p>
                    )}
                </div>
            </section>
        </>
    );
};

export default Page;
