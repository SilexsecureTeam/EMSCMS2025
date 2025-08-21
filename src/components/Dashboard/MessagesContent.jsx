const MessagesContent = () => {
    return (
      <>
        <h2 className="text-lg font-semibold mb-4 md:text-xl">Messaging Center</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-3 bg-gray-50 border-b">
              <h3 className="font-medium text-sm md:text-base">Conversations</h3>
            </div>
            <div className="divide-y max-h-96 overflow-y-auto">
              {[ 
                {
                  title: 'Faculty Meeting',
                  desc: 'Discussion about the upcoming semester',
                  active: true,
                },
                {
                  title: 'Student Support Group',
                  desc: 'New resources for student assistance',
                },
                { title: 'IT Department', desc: 'System maintenance notification' },
                { title: 'Dr. Williams', desc: 'Question about the curriculum' },
              ].map((conv, index) => (
                <div
                  key={index}
                  className={`p-3 hover:bg-gray-50 cursor-pointer ${
                    conv.active ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="font-medium text-sm md:text-base">{conv.title}</div>
                  <div className="text-xs text-gray-500 truncate">{conv.desc}</div>
                </div>
              ))}
            </div>
          </div>
  
          <div className="col-span-1 bg-white rounded-lg shadow flex flex-col md:col-span-2">
            <div className="p-3 bg-gray-50 border-b">
              <h3 className="font-medium text-sm md:text-base">Faculty Meeting</h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {[
                  {
                    sender: 'John Smith',
                    message: "Good morning everyone! I'd like to discuss the upcoming semester planning.",
                    time: '9:32 AM',
                    color: 'amber-400',
                    side: 'left',
                  },
                  {
                    sender: 'You',
                    message: "Thanks for bringing this up. I've prepared some materials we should review.",
                    time: '9:45 AM',
                    color: 'blue-400',
                    side: 'right',
                  },
                  {
                    sender: 'Emma Davis',
                    message: 'I have some concerns about classroom assignments that we should address.',
                    time: '10:05 AM',
                    color: 'purple-400',
                    side: 'left',
                  },
                ].map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.side === 'right' ? 'justify-end' : ''}`}
                  >
                    {msg.side === 'left' && (
                      <div
                        className={`w-6 h-6 rounded-full bg-${msg.color} flex-shrink-0 md:w-8 md:h-8`}
                      ></div>
                    )}
                    <div
                      className={`mx-2 bg-${
                        msg.side === 'right' ? 'green-100' : 'gray-100'
                      } rounded-lg p-3 max-w-[80%] md:max-w-md`}
                    >
                      <div className="font-medium text-sm md:text-base">
                        {msg.sender}
                      </div>
                      <div className="text-sm md:text-base">{msg.message}</div>
                      <div className="text-xs text-gray-500 mt-1">{msg.time}</div>
                    </div>
                    {msg.side === 'right' && (
                      <div
                        className={`w-6 h-6 rounded-full bg-${msg.color} flex-shrink-0 md:w-8 md:h-8`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-3 border-t">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border rounded-l text-sm md:text-base"
                />
                <button className="bg-green-700 text-white px-4 py-2 rounded-r text-sm md:text-base">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  export default MessagesContent