const { Professional, Certification, Degree } = require('../models')
const { sequelize } = require('../utils/db')

const completeProfile = async (profileData, userId) => {
  return sequelize.transaction(async () => {
    const professional = await Professional.create({
      userId,
      facilityName: profileData.profressionalDetail.facilityName,
      facilityAddress: profileData.profressionalDetail.facilityAddress,
      zipCode: profileData.profressionalDetail.zipCode,
      city: profileData.profressionalDetail.city,
      country: profileData.profressionalDetail.country,
      stateProvince: profileData.profressionalDetail.stateProvince,
      ethnicity: profileData.profressionalDetail.ethnicity,
      spokenLanguages: profileData.profressionalDetail.spokenLanguages,
      medicalLicenseNumber: profileData.profressionalDetail.medicalLicenseNumber,
      yearsOfExperience: profileData.profressionalDetail.yearsOfExperience,
      specialities: profileData.profressionalDetail.specialities,
    })


    const certifications = profileData.certifications.map((cert) => ({
      professionalId: professional.id,
      title: cert.title,
      licenseNumber: cert.licenseNumber,
      issueDate: cert.issueDate,
      documentProof: cert.documentProof,
    }))
    await Certification.bulkCreate(certifications)
    
    
    const degrees = profileData.degrees.map((degree) => ({
      professionalId: professional.id,
      title: degree.title,
      institution: degree.institution,
      year: degree.year,
      documentProof: degree.documentProof,
    }))
    await Degree.bulkCreate(degrees)

    console.log('Profile completed successfully!')
  })
}


module.exports = completeProfile