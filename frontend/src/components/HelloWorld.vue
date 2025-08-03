<script>
import IconMic from "../assets/mic.svg";
import IconMessage from "../assets/message-square.svg";
import IconSend from "../assets/send.svg";

export default {
    name: "Home",
    data() {
        return {
            message: "",
            response: "",
            isLoading: false,
        };
    },
    components: {
        IconMic,
        IconMessage,
        IconSend,
    },
    methods: {
        autoResize() {
            const textarea = this.$refs.textarea;
            if (textarea) {
                textarea.style.height = "auto";
                textarea.style.height =
                    Math.min(textarea.scrollHeight, window.innerHeight * 0.6) +
                    "px";
            }
        },
        async sendMessage() {
            if (!this.message.trim()) return;
            this.isLoading = true;
            try {
                const res = await fetch("http://localhost:3000/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ message: this.message }),
                });
                const data = await res.json();
                if (data.success) {
                    this.response = data.data;
                } else {
                    this.response = "Error from server";
                }
            } catch (e) {
                console.error(e);
                this.response = "Network error";
            } finally {
                this.message = "";
                this.isLoading = false;
            }
        },
        handleHire() {
            console.log("Hire button clicked");
            alert("Hire me!");
        },
        handleMic() {
            console.log("Mic button clicked");
            alert("Not implemented yet");
        },
    },
    mounted() {
        this.autoResize();
    },
};
</script>

<template>
    <div class="app-container">
        <!-- Chat Icon -->
        <div class="chat-icon">
            <div class="icon-bubble" @click="handleHire">
                <IconMessage />
            </div>
        </div>

        <div class="content-wrapper">
            <!-- Header -->
            <div class="header">
                <h1 class="greeting">Hi there!</h1>
                <h2 class="main-title">What would you like to know?</h2>
                <p class="subtitle">
                    Use one of the most common prompts below<br />
                    or ask your own question
                </p>
            </div>

            <!-- Input Section -->
            <div class="input-section">
                <div class="input-container">
                    <div class="mic-icon" @click="handleMic">
                        <IconMic />
                    </div>
                    <textarea
                        v-model="message"
                        placeholder="Ask whatever you want"
                        :disabled="isLoading"
                        ref="textarea"
                        @input="autoResize"
                        class="message-input"
                        @keydown.enter="sendMessage"
                    />
                    <button
                        @click="sendMessage"
                        :disabled="isLoading || !message.trim()"
                        class="send-button"
                    >
                        <IconSend />
                    </button>
                </div>
            </div>

            <!-- Response Section -->
            <div v-if="response" class="response-section">
                <div class="response-container">
                    <div class="response-header">
                        <strong>Response:</strong>
                    </div>
                    <div class="response-content">
                        <p class="response-text">{{ response }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
$white: #fff;
$blue-gradient: linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #1e40af 100%);
$button-gradient: linear-gradient(135deg, #3b82f6, #1d4ed8);
$button-hover-gradient: linear-gradient(135deg, #2563eb, #1e40af);
$text-color: rgba(255, 255, 255, 0.9);
$placeholder-color: rgba(255, 255, 255, 0.6);
$border-color: rgba(255, 255, 255, 0.2);
$border-focus-color: rgba(255, 255, 255, 0.3);
$bg-blur: rgba(255, 255, 255, 0.1);
$bg-blur-hover: rgba(255, 255, 255, 0.15);

@mixin glassy-box($padding: 1rem 1.5rem) {
    background: $bg-blur;
    backdrop-filter: blur(20px);
    border: 1px solid $border-color;
    border-radius: 24px;
    padding: $padding;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.app-container {
    min-height: 100vh;
    background: $blue-gradient;
    padding: 2rem;
    font-family:
        -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    align-content: center;

    .chat-icon {
        position: fixed;
        top: 2rem;
        left: 2rem;
        z-index: 10;

        .icon-bubble {
            width: 60px;
            height: 60px;
            background: $bg-blur;
            backdrop-filter: blur(10px);
            border: 1px solid $border-color;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: $white;
            transition: all 0.3s ease;

            &:hover {
                background: $bg-blur-hover;
                transform: translateY(-2px);
            }
        }
    }

    .content-wrapper {
        max-width: 800px;
        margin: 0 auto;
        padding-top: 4rem;

        .header {
            text-align: center;
            margin-bottom: 4rem;
            color: $white;

            .greeting {
                font-size: 2.5rem;
                font-weight: 300;
                margin-bottom: 1rem;
                opacity: 0.9;
            }

            .main-title {
                font-size: 3.5rem;
                font-weight: 600;
                margin-bottom: 2rem;
                line-height: 1.1;
            }

            .subtitle {
                font-size: 1.25rem;
                opacity: 0.8;
                font-weight: 300;
                line-height: 1.6;
            }
        }

        .input-section {
            margin-bottom: 3rem;

            .input-container {
                @include glassy-box();
                display: flex;
                align-items: center;
                gap: 1rem;

                &:focus-within {
                    background: $bg-blur-hover;
                    border-color: $border-focus-color;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                }

                .mic-icon {
                    color: $placeholder-color;
                    flex-shrink: 0;
                    &:hover {
                        color: $white;
                    }
                }

                .message-input {
                    flex: 1;
                    background: transparent;
                    border: none;
                    outline: none;
                    color: $white;
                    font-size: 1.1rem;
                    resize: none;
                    min-height: 24px;
                    max-height: 200px;
                    overflow-y: auto;
                    align-content: center;

                    &::placeholder {
                        color: $placeholder-color;
                    }
                }

                .send-button {
                    background: $button-gradient;
                    border: none;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    flex-shrink: 0;
                    width: 44px;
                    height: 44px;

                    &:hover:not(:disabled) {
                        background: $button-hover-gradient;
                        transform: translateY(-1px);
                        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
                    }

                    &:disabled {
                        opacity: 0.5;
                        cursor: not-allowed;
                        transform: none;
                        animation: pulse 1.5s ease-in-out infinite;
                    }
                }
            }
        }

        .response-section {
            margin-top: 2rem;

            .response-container {
                @include glassy-box(2rem);
                border-radius: 20px;

                .response-header {
                    color: $white;
                    font-size: 1.1rem;
                    margin-bottom: 1rem;
                    font-weight: 600;
                }

                .response-content {
                    color: $text-color;

                    .response-text {
                        line-height: 1.6;
                        white-space: pre-line;
                        font-size: 1rem;
                    }
                }
            }
        }
    }
}

@media (max-width: 768px) {
    .app-container {
        padding: 1rem;

        .chat-icon {
            top: 1rem;
            left: 1rem;

            .icon-bubble {
                width: 50px;
                height: 50px;
            }
        }

        .content-wrapper {
            padding-top: 2rem;

            .header {
                .greeting {
                    font-size: 2rem;
                }

                .main-title {
                    font-size: 2.5rem;
                }

                .subtitle {
                    font-size: 1.1rem;
                }
            }

            .input-section {
                .input-container {
                    padding: 0.75rem 1rem;
                }
            }
        }
    }
}

@keyframes pulse {
    0%,
    100% {
        opacity: 0.5;
    }
    50% {
        opacity: 0.8;
    }
}
</style>
