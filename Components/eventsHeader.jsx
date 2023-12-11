
import { Button, DropdownMenu, Theme } from "@radix-ui/themes"

const eventsHeader = () => {
    return (
        <>
       <div className="third-et-hero-tabs-container">

        <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Button onClick={() => {
                        setPressed(true)
                        setisSwitchUser(true)
                    }}     className="third-et-hero-tab"  style={{fontFamily: "sans-serif", fontWeight: 100, fontSize: 13, height: 70, background:"#1B1C1F" }}>
                    Created
                    </Button>
                </DropdownMenu.Trigger>
            
                
            </DropdownMenu.Root>

           
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Button className="third-et-hero-tab"  style={{fontFamily: "sans-serif", fontWeight: 100, fontSize: 13, height: 70, background:"#1B1C1F"}}>
                    Booked
                    </Button>
                </DropdownMenu.Trigger>
                    <DropdownMenu.Content style={{maxHeight: "80vh", overflowY: "auto" }}>
                        <DropdownMenu.Item onClick={() => {

                        }}>
                           
                        </DropdownMenu.Item>
                    
                </DropdownMenu.Content>
                
                    
                
            </DropdownMenu.Root>
            
           
           

          

            <a onClick={ () => {console.log("Sup")}} className="third-et-hero-tab-edit"> Create Event </a>

        </div>
    </>
    )
}
export default eventsHeader