export const idlFactory = ({ IDL }) => {
  const Task = IDL.Record({ 'title' : IDL.Text, 'content' : IDL.Text });
  return IDL.Service({
    'addTask' : IDL.Func([IDL.Text, IDL.Text], [], ['oneway']),
    'getTasks' : IDL.Func([], [IDL.Vec(Task)], ['query']),
    'removeTask' : IDL.Func([IDL.Nat], [IDL.Vec(Task)], []),
  });
};
export const init = ({ IDL }) => { return []; };
