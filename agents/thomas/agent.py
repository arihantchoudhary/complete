import asyncio
from dotenv import load_dotenv
load_dotenv()
from browser_use import Agent
from langchain_openai import ChatOpenAI
from browser import BrowserUseActivator
import time

# async def main():
#     activator = BrowserUseActivator()
# activator.activate()

#     agent = Agent(
#         task="Compare the price of gpt-4o and DeepSeek-V3",
#         llm=ChatOpenAI(model="gpt-4o"),
#     )
#     await agent.run()

async def worker_service():
    activator = BrowserUseActivator()
    activator.deactivate()
    
    reschedule_task  = '''
    %%%%%%%%%%%
    LOGIN PAGE
    %%%%%%%%%%%
    Go to https://shipmate-redwood-portal.lovable.app/ and sign in as operator01 / pass123
    %%%%%%%%%%%
    SHIPMENT SERVICE PAGE
    %%%%%%%%%%%
    Go to shipment service and reschdule all
    '''
    
    reschedule_agent = Agent(
        task=reschedule_task,
        llm=ChatOpenAI(model="gpt-4o")
    )
    rerouting_agent = Agent(
        task="Go to https://v0-oracle-tms-design.vercel.app/, in the table below International Shipment Management. Pick any of the rows in which the shipment says in transit or pending and click on the reroute option (the 4th icon from the left side). The click on alternative port route.",
        llm=ChatOpenAI(model="gpt-4o")
    )
    while True:

        if activator.is_rescheduling():
            print("Service is rescheduling, performing work...")
            # Do your work here
            await reschedule_agent.run()   
            activator.deactivate() 
            time.sleep(5)
        elif activator.is_rerouting():
            print("Service is rerouting, performing work...")
            # Do your work here
            await rerouting_agent.run()  
            activator.deactivate()  
            time.sleep(5)
        else:
            print("Service inactive, waiting...")
            time.sleep(2)

asyncio.run(worker_service())

