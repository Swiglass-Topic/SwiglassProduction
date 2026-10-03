import discord
from discord.ext import commands

# Setup Intents (Crucial to read message text)
intents = discord.Intents.default()
intents.message_content = True  # Required to look at what users type

bot = commands.Bot(command_prefix="!", intents=intents)

@bot.event
async def on_ready():
    print(f"✓ Successfully logged in as {bot.user}")

@bot.event
async def on_message(message):
    # Ignore messages sent by the bot itself to prevent infinite loops
    if message.author == bot.user:
        return

    # Normalize user message to lowercase and strip whitespace
    user_message = message.content.lower().strip()

    # Match exact word "cc" 
    if user_message == "cc":
        await message.reply("cc omry")
        return  # Stop processing further to save resources

    # This line ensures other standard commands still work if you add them later
    await bot.process_commands(message)

# Run the bot using your unique token
bot.run("MTU1NTI3OTA3NTAxMzMwNDU0Mg.GvkEF4.0uUpJjqqNkgCKnVEGksJXZNS-9rgaBb_7Px7yk")

