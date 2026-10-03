import os
import discord
from dotenv import load_dotenv

# Load hidden environment variables (for local testing)
load_dotenv()
TOKEN = os.getenv('MTU1NTI3OTA3NTAxMzMwNDU0Mg.GIWM_4.9N_Yzw_3FI3gf0SkOx_I3LhohTKdLUY1149Gmw')

# Enable message content permissions
intents = discord.Intents.default()
intents.message_content = True

client = discord.Client(intents=intents)

@client.event
async def on_ready():
    print(f'Bot is online! Logged in as {client.user}')

@client.event
async def on_message(message):
    # Ignore messages sent by bots (including itself)
    if message.author.bot:
        return

    # Check if someone says "cc" (ignores uppercase/lowercase and extra spaces)
    if message.content.strip().lower() == 'cc':
        await message.channel.send('cc omry')

client.run(TOKEN)
