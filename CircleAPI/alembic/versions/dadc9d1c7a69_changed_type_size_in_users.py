"""changed type size in users

Revision ID: dadc9d1c7a69
Revises: 
Create Date: 2024-10-08 15:20:20.539695

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = 'dadc9d1c7a69'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('users', 'userType',
               existing_type=mysql.VARCHAR(length=50),
               type_=sa.String(length=30),
               existing_nullable=True)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('users', 'userType',
               existing_type=sa.String(length=30),
               type_=mysql.VARCHAR(length=50),
               existing_nullable=True)
    # ### end Alembic commands ###
