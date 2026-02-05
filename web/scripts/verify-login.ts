import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@wra.com';
    const inputPassword = 'admi123';

    console.log(`Checking user: ${email}`);

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        console.log('User not found!');
        return;
    }

    console.log('User found:', { id: user.id, email: user.email, role: user.role, passwordHash: user.password });

    if (!user.password) {
        console.log('User has no password set.');
        return;
    }

    const isValid = await compare(inputPassword, user.password);
    console.log(`Password '${inputPassword}' is valid: ${isValid}`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
