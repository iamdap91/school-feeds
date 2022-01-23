export const jwtConstants = {
  secret: {
    manager: process.env.MANAGER_SECRET_KEY || 'manager',
    student: process.env.STUDENT_SECRET_KEY || 'student',
  },
};
