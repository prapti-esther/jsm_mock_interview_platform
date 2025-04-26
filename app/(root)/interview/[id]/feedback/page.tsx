import React from "react";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getFeedbackByInterviewId, getInterviewById } from "@/lib/actions/general.action";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";

const Page = async ({ params }: RouteParams) => {
    const { id } = await params;
    const user = await getCurrentUser();

    // Fetch interview details
    const interview = await getInterviewById(id);
    if (!interview) redirect('/');  // If interview not found, redirect

    // Fetch feedback based on the current user and interview ID
    const feedback = await getFeedbackByInterviewId({
        interviewId: id,
        userId: user?.id!,
    });

    // If no feedback for this user, redirect or show a message
    if (!feedback) {
        return (
            <div className="flex justify-center items-start min-h-screen pt-20">
                <div className="bg-black p-10 rounded-xl border-2 border-gray-700 shadow-[0_0_25px_5px_rgba(128,128,128,0.4)] w-full max-w-2xl text-center">

                    <h1 className="text-3xl font-extrabold text-indigo-100 mb-6 inter tracking-tight">
                        No Feedback Available
                    </h1>

                    <p className="text-lg text-indigo-100 mb-10 inter">
                        You haven't taken this interview yet. Time to ace it!
                    </p>

                    <Link href={`/interview/${id}`} className="w-full">
                        <Button
                            className="w-full bg-indigo-200 hover:bg-indigo-200 text-black text-lg font-bold py-4 rounded-full transition duration-300"
                        >
            <span className="text-black font-semibold tracking-wider">
              Take the Interview
            </span>
                        </Button>
                    </Link>

                </div>
            </div>
        );
    }




    return (
        <section className="section-feedback">
            <div className="flex flex-row justify-center">
                <h1 className="text-4xl font-semibold">
                    Feedback on the Interview -{" "}
                    <span className="capitalize">{interview.role}</span> Interview
                </h1>
            </div>

            <div className="flex flex-row justify-center">
                <div className="flex flex-row gap-5">
                    <div className="flex flex-row gap-2 items-center">
                        <Image src="/star.svg" width={22} height={22} alt="star" />
                        <p>
                            Overall Impression:{" "}
                            <span className="text-primary-200 font-bold">
                                {feedback?.totalScore}
                            </span>
                            /100
                        </p>
                    </div>

                    <div className="flex flex-row gap-2">
                        <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
                        <p>
                            {feedback?.createdAt
                                ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                                : "N/A"}
                        </p>
                    </div>
                </div>
            </div>

            <hr />

            <p>{feedback?.finalAssessment}</p>

            <div className="flex flex-col gap-4">
                <h2>Breakdown of the Interview:</h2>
                {feedback?.categoryScores?.map((category, index) => (
                    <div key={index}>
                        <p className="font-bold">
                            {index + 1}. {category.name} ({category.score}/100)
                        </p>
                        <p>{category.comment}</p>
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-3">
                <h3>Strengths</h3>
                <ul>
                    {feedback?.strengths?.map((strength, index) => (
                        <li key={index}>{strength}</li>
                    ))}
                </ul>
            </div>

            <div className="flex flex-col gap-3">
                <h3>Areas for Improvement</h3>
                <ul>
                    {feedback?.areasForImprovement?.map((area, index) => (
                        <li key={index}>{area}</li>
                    ))}
                </ul>
            </div>

            <div className="buttons">
                <Button className="btn-secondary flex-1">
                    <Link href="/" className="flex w-full justify-center">
                        <p className="text-sm font-semibold text-primary-200 text-center">
                            Back to dashboard
                        </p>
                    </Link>
                </Button>

                <Button className="btn-primary flex-1">
                    <Link
                        href={`/interview/${id}`}
                        className="flex w-full justify-center"
                    >
                        <p className="text-sm font-semibold text-black text-center">
                            Retake Interview
                        </p>
                    </Link>
                </Button>
            </div>
        </section>
    );
};

export default Page;
