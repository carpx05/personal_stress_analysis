import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    google_api_key = os.getenv("GOOGLE_API_KEY")
    llm_model = os.getenv("LLM_MODEL")
    # FLASK_HOST = os.getenv("FLASK_HOST")
    chatbot_url = os.getenv("CHATBOT_URL", "") + google_api_key
    MODEL_PATH = os.getenv("MODEL_PATH")
    # huggingface_model = os.getenv("HUGGINGFACE_MODEL")
    # vectordb_path = os.getenv("VECTORDB_PATH")
    # model_path = os.getenv("MODEL_PATH")

# print(Config.google_api_key)
# print(Config.llm_model)
# print(Config.chatbot_url)
# print(Config.huggingface_model)
