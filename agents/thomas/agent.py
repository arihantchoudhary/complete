import asyncio
from dotenv import load_dotenv
load_dotenv()
from browser_use import Agent
from langchain_openai import ChatOpenAI
from browser import BrowserUseActivator
import time



async def worker_service():
    activator = BrowserUseActivator()
    task  = '''
    You are an agent made to navigate through Shipping Portals
    Go to https://shipmate-redwood-portal.lovable.app/ 
    DETECT A PAGE FIRST AND DO EXECUTE ACTIONS BASED ON THE PAGE


    %%%%%%%%%%%
    LOGIN PAGE
    %%%%%%%%%%%
    Sign in as operator01 / pass123 
    and/or go to shipment service and reschdule all",



    %%%%%%%%%%%


    %%%%%%%%%%
    '''

    agent = Agent(
        task=task,
        llm=ChatOpenAI(model="gpt-4o")
    )
    while True:

        if activator.is_active():
            print("Risk Mitigation Signal Received. Time to perform the task")
            # Do your work here
            await agent.run()    
            time.sleep(5)
        else:
            print("Thomas is awake and checking for alerts!")
            time.sleep(2)

asyncio.run(worker_service())
