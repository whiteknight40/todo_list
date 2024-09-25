import List "mo:base/List";
// import Buffer "mo:base/Buffer";
import d "mo:base/Debug";
import Nat "mo:base/Nat";

actor TaskManager {
  public type Task = {
    title : Text;
    content : Text;
  };
  
  stable var tasks : List.List<Task> = List.nil<Task>();

  public func addTask(titleText : Text, contentText : Text) {
    let newTask : Task = {
      title = titleText;
      content = contentText;
    };
    tasks := List.push(newTask, tasks);
    d.print(debug_show (tasks));
  };
  
  public query func getTasks() : async [Task] {
    List.toArray(tasks);
  };
  
  public func removeTask(index : Nat) : async [Task] {
    let tasks1 = List.take(tasks, index);
    let tasks2 = List.drop(tasks, index +1);
    tasks := List.append(tasks1, tasks2);
    return List.toArray(tasks);
  };
};
