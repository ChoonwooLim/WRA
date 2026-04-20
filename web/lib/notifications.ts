import { prisma } from '@/lib/prisma';

export type NotificationType = 'signup' | 'cert' | 'post' | 'comment' | 'subscribe';

interface CreateNotificationInput {
    type: NotificationType;
    title: string;
    message: string;
    detail?: string;
    actionLabel?: string;
    actionHref?: string;
}

export async function createNotification(input: CreateNotificationInput) {
    try {
        return await prisma.notification.create({
            data: {
                type: input.type,
                title: input.title,
                message: input.message,
                detail: input.detail || null,
                actionLabel: input.actionLabel || null,
                actionHref: input.actionHref || null,
            },
        });
    } catch (error) {
        console.error('createNotification failed:', error);
        return null;
    }
}
