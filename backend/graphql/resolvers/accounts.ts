import { Account as AccountType } from '@prisma/client';
import { Context } from '../../context';

export const Account = {
  async transactions(_parent: AccountType, _args: any, context: Context) {
    const transactions = await context.prisma.transaction.findMany({
      where: { accountId: _parent.id },
      orderBy: { date: 'desc' },
      include: { category: true },
    });
    return transactions;
  },
};
