// MongoDB initialization script
db = db.getSiblingDB('hospital_db');

// Create admin user
db.createUser({
  user: 'admin',
  pwd: 'admin123',
  roles: [
    {
      role: 'readWriteAnyDatabase',
      db: 'hospital_db'
    },
    {
      role: 'dbAdminAnyDatabase',
      db: 'admin'
    }
  ]
});

// Create collections with indexes
// Users collection
db.createCollection('users');
db.users.createIndex({ username: 1 }, { unique: true });
db.users.createIndex({ email: 1 }, { unique: true });

// Equipment collection
db.createCollection('equipment');
db.equipment.createIndex({ id: 1 }, { unique: true });
db.equipment.createIndex({ status: 1 });
db.equipment.createIndex({ department: 1 });

// Patients collection
db.createCollection('patients');
db.patients.createIndex({ id: 1 }, { unique: true });
db.patients.createIndex({ medicalRecordNumber: 1 }, { unique: true });

// Doctors collection
db.createCollection('doctors');
db.doctors.createIndex({ id: 1 }, { unique: true });
db.doctors.createIndex({ licenseNumber: 1 }, { unique: true });

// Appointments collection
db.createCollection('appointments');
db.appointments.createIndex({ id: 1 }, { unique: true });
db.appointments.createIndex({ patientId: 1, appointmentDate: 1 });

// Maintenance records collection
db.createCollection('maintenance_records');
db.maintenance_records.createIndex({ id: 1 }, { unique: true });
db.maintenance_records.createIndex({ equipmentId: 1, status: 1 });

// System logs collection
db.createCollection('system_logs');
db.system_logs.createIndex({ timestamp: -1 });
db.system_logs.createIndex({ level: 1, timestamp: -1 });

print('MongoDB initialization completed successfully');