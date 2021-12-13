const MentionsLimiterOpts = {
    allowUsers: true,
    allowRoles: true,
    allowEveryone: true,
    allowRepliedUser: true,
};
class MentionsLimiter {
    /**
     * Mentions object when dealing with messages
     * @param {MentionsLimiterOpts} opts Defaults/options
     */
    constructor(opts = MentionsLimiterOpts) {
        const options = {
            ...MentionsLimiterOpts,
            ...opts,
        };
        this.parse = [];
        this.replied_user = options.allowRepliedUser;

        if (options.allowUsers) this.parse.push("users");
        if (options.allowRoles) this.parse.push("roles");
        if (options.allowEveryone) this.parse.push("everyone");
    }
}

const CustomStatusOpts = {
    text: null,
    emoji: null,
    expireAt: null,
};
class CustomStatus {
    /**
     * Custom status object and logic
     * @param {CustomStatusOpts} opts Defaults/options
     */
    constructor(opts = CustomStatusOpts) {
        const options = {
            ...CustomStatusOpts,
            ...opts,
        };
        this.contents = {
            expires_at: options.expireAt,
            text: options.text,
            emoji_name: options.emoji,
        };

        for (const key in this.contents) {
            if (this.contents[key] === null) {
                delete this.contents[key];
            }
        }
        if (Object.keys(this.contents).length === 0) this.contents = null;
    }
}

const SendMessageOpts = {
    content: "",
    reply: null,
    tts: false,
    embeds: [],
    allowed_mentions: MentionsLimiterOpts,
    components: null,
    stickers: [],
};
class SendMessage {
    /**
     * Message send class for sending messages
     * @param {SendMessageOpts} opts Defaults/options
     */
    constructor(opts = SendMessageOpts) {
        const options = {
            ...SendMessageOpts,
            ...opts,
        };
        this.content = JSON.stringify({
            content: options.content,
            tts: options.tts,
            embeds: options.embeds,
            allowed_mentions: new MentionsLimiter(options.allowed_mentions),
            message_reference:
                options.reply !== null
                    ? {
                          message_id: options.reply,
                      }
                    : null,
            components: null,
            sticker_ids: options.stickers,
        });
    }
}

module.exports = {
    fetchRequestOpts: {
        method: "GET",
        body: null,
        parse: true,
    },
    MentionsLimiterOpts,
    CustomStatusOpts,
    SendMessageOpts,
    MentionsLimiter,
    CustomStatus,
    SendMessage,
};
