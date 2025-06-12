const OpenAI = require('openai');
const openai = new OpenAI(process.env.OPENAI_API_KEY);

// Simple task generation
async function generateTasks(goals) {
  const prompt = `Create 3 tasks for each of these goals: ${goals.join(', ')}`;
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }]
  });
  return response.choices[0].message.content.split('\n').filter(Boolean);
}

// Basic task distribution
function distributeTasks(tasks, times) {
  const result = {};
  const chunkSize = Math.ceil(tasks.length / times.length);
  
  times.forEach((time, i) => {
    const start = i * chunkSize;
    result[time] = tasks.slice(start, start + chunkSize);
  });
  
  return result;
}

module.exports = { generateTasks, distributeTasks };