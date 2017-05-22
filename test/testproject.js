import ProjectModel from '../server_logic/models/projectModel';
import moment from 'moment';

const _projectModel = new ProjectModel();

const insert = async() => {
  console.log('11111');
  await _projectModel.CreatetProject({
    proCode: "u00001",
    proName: "赵翔q",
    proProxy: "122333222"
  });
  await _projectModel.CreatetProject({
    proCode: "u00002",
    proName: "赵翔qw",
    proProxy: "122333222"
  });
  await _projectModel.CreatetProject({
    proCode: "u00003",
    proName: "赵翔e",
    proProxy: "122333222"
  });
  await _projectModel.CreatetProject({
    proCode: "u00004",
    proName: "赵翔r",
    proProxy: "122333222"
  });
  await _projectModel.CreatetProject({
    proCode: "u00005",
    proName: "赵翔6",
    proProxy: "122333222"
  });
  console.log('222222');
}

const getbyname = async() => {
  const _reData=await _projectModel.GetByProjectName("赵",3,1,{"proCode":-1});
  console.log("_reData",_reData);
}

const test = async ()=>{
  await insert();
  //await getbyname();
}


test();
