// const validator = new Validator

// validator.check(
//   typeof profileData !== 'undefined' && profileData !== null, 'profileData', 'must be provided'
// )
// validator.check(typeof userId !== 'undefined' && userId !== null, 'userId', 'must be provided')
  
// validator.check(profileData.profressionalDetail.facilityName, 'facilityName', 'must be provided')
// validator.check(profileData.profressionalDetail.zipCode, 'zipCode', 'must be provided')
// validator.check(profileData.profressionalDetail.city, 'city', 'must be provided')
// validator.check(profileData.profressionalDetail.stateProvince, 'stateProvince', 'must be provided')
// validator.check(profileData.profressionalDetail.country, 'country', 'must be provided')
// validator.check(profileData.profressionalDetail.ethnicity, 'ethnicity', 'must be provided')
// validator.check(profileData.profressionalDetail.spokenLanguages, 'spokenLanguages', 'must be provided')
// validator.check(profileData.profressionalDetail.medicalLicenseNumber, 'medicalLicenseNumber', 'must be provided')
// validator.check(profileData.profressionalDetail.yearsOfExperience, 'yearsOfExperience', 'must be provided')
// validator.check(profileData.profressionalDetail.specialities, 'specialities', 'must be provided')


// //  validate certifications
// validator.check(
//   typeof profileData.certifications !== 'undefined' && profileData.certifications !== null,
//   'certifications', 'must be provided'
// )
  
// validator.check(Array.isArray(profileData.certifications), 'certifications', 'must be an array')
// validator.check(
//   profileData.certifications.length > 0, 'certifications', 'must not be empty'
// )
  
// //  validate degrees
// validator.check(
//   typeof profileData.degrees !== 'undefined' && profileData.degrees !== null, 'degrees', 'must be provided'
// )
  
// validator.check(Array.isArray(profileData.degrees), 'degrees', 'must be an array')
// validator.check(
//   profileData.degrees.length > 0, 'degrees', 'must not be empty'
// )