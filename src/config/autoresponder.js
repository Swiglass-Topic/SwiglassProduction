import os
import discord
import asyncio

# Setup intents
intents = discord.Intents.default()
intents.message_content = True
client = discord.Client(intents=intents)

# Track cooldowns to prevent spam
cooldowns = {}

# SINGLE PROBOT-STYLE RESPONSE CONFIGURATION
TRIGGERS = ["cc", "slm", "hi"] # Words that trigger the response
REPLY_TEXT = "Cc Omry❤️" # The single response
MATCH_TYPE = "contains" # Options: "exact", "contains", or "startswith"

@client.event
async def on_ready():
    print(f"🚀 Bot is online as {client.user} with a single auto-response.")

@client.event
async def on_message(message):
    # Ignore messages from bots
    if message.author.bot:
        return

    content = message.content.strip().lower()
    channel_id = message.channel.id

    if channel_id not in cooldowns:
        cooldowns[channel_id] = set()

    # Check the triggers for a match
    for trigger in TRIGGERS:
        trigger_lower = trigger.lower()
        is_match = False

        if MATCH_TYPE == "exact" and content == trigger_lower:
            is_match = True
        elif MATCH_TYPE == "contains" and trigger_lower in content:
            is_match = True
        elif MATCH_TYPE == "startswith" and content.startswith(trigger_lower):
            is_match = True

        if is_match:
            # Prevent spam loops in the channel
            if trigger_lower in cooldowns[channel_id]:
                return 

            try:
                # Reply directly to the user
                await message.reply(REPLY_TEXT, mention_author=True)
                
                # Apply a 5-second channel cooldown for this trigger
                cooldowns[channel_id].add(trigger_lower)
                await asyncio.sleep(5)
                cooldowns[channel_id].discard(trigger_lower)
                
            except discord.Forbidden:
                print(f"❌ Missing permissions to reply in channel {channel_id}")
            except Exception as e:
                print(f"❌ Error sending message: {e}")
            return 

# Run the bot using your GitHub Secret token
TOKEN = os.getenv("MTU1NTI3OTA3NTAxMzMwNDU0Mg.GvrmNq.nIa_wANcKSFQCmdGEighTbk7ba8jwNZczqMasM")
if not TOKEN:
    print("❌ Error: DISCORD_TOKEN secret is missing in GitHub Settings!")
else:
    client.run(TOKEN)
