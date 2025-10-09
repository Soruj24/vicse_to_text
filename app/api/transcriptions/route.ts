import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Transcription from '@/models/Transcription';
import { ApiResponse, ITranscription, TranscriptionRequest } from '@/types';

export async function GET(
    request: NextRequest
): Promise<NextResponse<ApiResponse>> {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '50');
        const userId = searchParams.get('userId') || 'anonymous';

        const transcriptions = await Transcription.find({ userId })
            .sort({ timestamp: -1 })
            .limit(limit)
            .lean();

        return NextResponse.json({
            success: true,
            data: transcriptions as ITranscription[],
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}

export async function POST(
    request: NextRequest
): Promise<NextResponse<ApiResponse>> {
    try {
        await dbConnect();

        const body: TranscriptionRequest = await request.json();

        if (!body.text || body.text.trim().length === 0) {
            return NextResponse.json(
                { success: false, error: 'Text is required' },
                { status: 400 }
            );
        }

        const transcription = await Transcription.create(body);

        return NextResponse.json({
            success: true,
            data: transcription.toObject() as ITranscription,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest
): Promise<NextResponse<ApiResponse>> {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID is required' },
                { status: 400 }
            );
        }

        await Transcription.findByIdAndDelete(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}